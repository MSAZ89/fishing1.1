// src/lib/fishStore.ts
import type { Fish } from '$lib/classes/fish';
import { writable } from 'svelte/store';
import { fishList } from '$lib/classes/fish';

export const inventory = writable<Fish[]>([]);
export const totalWeight = writable<number>(0);
export const coins = writable<number>(0);
export const bait = writable<number>(5);
export const isFishing = writable<boolean>(false);
export const fishingLevel = writable<number>(50);
export const messages = writable<{ text: string; bold: boolean }[]>([]);

export function addMessage(text: string, bold = false) {
	messages.update((msgs) => [{ text, bold }, ...msgs]);
}

export function addRandomFish() {
	const randomFish = fishList[Math.floor(Math.random() * fishList.length)];
	const randomWeight =
		Math.random() * (randomFish.maxWeight - randomFish.minWeight) + randomFish.minWeight;
	const fishWithRandomWeight = { ...randomFish, minWeight: randomWeight };
	addMessage(`Caught a ${randomFish.name} (${randomWeight.toFixed(2)} lb)`, false);
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
		addMessage(`Sold fish for ${(1 * fishToRemove.minWeight).toFixed(2)} coins`, true);
		return newInventory;
	});
}

export function addCoins(amount: number) {
	coins.update((currentCoins) => currentCoins + amount);
}

export function removeCoins(amount: number) {
	coins.update((currentCoins) => currentCoins - amount);
}

export function addBait(amount: number) {
	bait.update((currentBait) => currentBait + amount);
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
