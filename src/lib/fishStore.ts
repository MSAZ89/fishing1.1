// src/lib/fishStore.ts
import type { Fish } from '$lib/classes/fish';
import { writable, derived } from 'svelte/store';
import { fishList } from '$lib/classes/fish';

// Existing Stores
export const inventory = writable<Fish[]>([]);
export const totalWeight = writable<number>(0);
export const totalWeightGained = writable<number>(0);
export const coins = writable<number>(0);
export const totalCoinsGained = writable<number>(0);
export const bait = writable<number>(100);
export const totalBaitAquired = writable<number>(100);
export const isFishing = writable<boolean>(false);
export const fishingLevel = writable<number>(1);
export const messages = writable<{ text: string; bold: boolean }[]>([]);
export const totalFishCaught = writable<number>(0);
export const fishingXp = writable<number>(0);

// Function to calculate XP needed for a specific level
function getXpForLevel(level: number): number {
	return Math.floor(300 * Math.pow(2, level / 7));
}

// Function to calculate the current fishing level based on XP
function calculateFishingLevel(xp: number): number {
	let level = 1;
	let xpForLevel = 0;

	while (true) {
		xpForLevel += getXpForLevel(level);
		if (xp < xpForLevel) {
			return level;
		}
		level++;
	}
}

// Function to add XP and handle level-ups
export function addFishingXp(amount: number) {
	fishingXp.update((xp) => {
		const oldLevel = calculateFishingLevel(xp);
		const newXp = xp + amount;
		const newLevel = calculateFishingLevel(newXp);

		if (newLevel > oldLevel) {
			addMessage(`Fishing level up! (${oldLevel} → ${newLevel})`, true);
		}

		fishingLevel.set(newLevel);
		return newXp;
	});
}

// Function to add messages
export function addMessage(text: string, bold = false) {
	messages.update((msgs) => [{ text, bold }, ...msgs]);
}

// Derived Store for XP Progress
export const fishingXpProgress = derived([fishingXp], ([$fishingXp]) => {
	const currentLevel = calculateFishingLevel($fishingXp);
	let xpForCurrentLevel = 0;

	// Calculate total XP required up to the current level
	for (let i = 1; i < currentLevel; i++) {
		xpForCurrentLevel += getXpForLevel(i);
	}

	// XP accumulated in the current level
	const currentLevelProgress = $fishingXp - xpForCurrentLevel;

	// XP needed to reach the next level
	const xpNeededForNextLevel = getXpForLevel(currentLevel);

	return `${Math.floor(currentLevelProgress)}/${xpNeededForNextLevel} XP`;
});

// Function to add a random fish and grant XP
export function addRandomFish() {
	const randomFish = fishList[Math.floor(Math.random() * fishList.length)];
	const randomWeight =
		Math.random() * (randomFish.maxWeight - randomFish.minWeight) + randomFish.minWeight;
	const fishWithRandomWeight = { ...randomFish, minWeight: randomWeight };

	addMessage(`Caught a ${randomFish.name} (${randomWeight.toFixed(2)} lb)!`, true);
	totalFishCaught.update((count) => count + 1);
	totalWeightGained.update((weight) => weight + randomWeight);

	// Flat XP per catch
	addFishingXp(randomWeight);

	inventory.update((currentInventory) => {
		totalWeight.update((weight) => weight + randomWeight);
		return [...currentInventory, fishWithRandomWeight];
	});
}

// fishStore.ts
export function removeFish(index: number, onRemove?: (message: string) => void) {
	inventory.update((currentInventory) => {
		const fishToRemove = currentInventory[index];
		totalWeight.update((weight) => weight - fishToRemove.minWeight);
		const newInventory = [...currentInventory];
		newInventory.splice(index, 1);
		addCoins(1 * fishToRemove.minWeight);
		addMessage(
			`Sold ${fishToRemove.name} for ${(1 * fishToRemove.minWeight).toFixed(2)} coins`,
			true
		);
		return newInventory;
	});
}

export function addCoins(amount: number) {
	coins.update((currentCoins) => currentCoins + amount);
	totalCoinsGained.update((totalCoins) => totalCoins + amount);
}

export function removeCoins(amount: number) {
	coins.update((currentCoins) => currentCoins - amount);
}

export function addBait(amount: number) {
	bait.update((currentBait) => currentBait + amount);
	totalBaitAquired.update((totalBait) => totalBait + amount);
}

export function removeBait(amount: number) {
	bait.update((currentBait) => currentBait - amount);
}

export function sellAllFish() {
	inventory.update((currentInventory) => {
		let totalFishWeight = 0;
		currentInventory.forEach((fish) => {
			totalFishWeight += fish.minWeight;
		});
		addCoins(totalFishWeight);
		totalWeight.set(0);
		addMessage(`Sold all fish for ${totalFishWeight.toFixed(2)} coins`, true);
		return [];
	});
}
