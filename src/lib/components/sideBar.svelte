<script lang="ts">
	import { onMount } from 'svelte';
	import SideBarBottom from './SideBarBottom.svelte';
	import {
		addRandomFish,
		sellAllFish,
		coins,
		removeCoins,
		bait,
		addBait,
		removeBait,
		isFishing,
		fishingLevel,
		addMessage,
		totalWeight,
		inventory
	} from '$lib/fishStore';
	import BasicButton from './BasicButton.svelte';
	import MessageLog from './MessageLog.svelte';

	let baitPrice = 10;

	function openModal() {
		const modal = document.getElementById('my_modal_2');
		if (modal instanceof HTMLDialogElement) modal.showModal();
	}

	function buyBait() {
		if ($coins >= baitPrice) {
			addBait(1);
			removeCoins(baitPrice);
			addMessage('Bought 1 bait', true);
		} else {
			alert('Not enough coins');
		}
	}

	function startFishing() {
		addMessage('[Started fishing]', true);
		isFishing.set(true);
		attemptFishing();
	}

	function stopFishing() {
		if ($isFishing) {
			addMessage('[Stopped fishing]', true);
		}
		if ($isFishing && $bait <= 0) {
			addMessage('Out of bait!', true);
		}
		isFishing.set(false);
	}

	function attemptFishing() {
		const interval = setInterval(() => {
			if ($isFishing && $bait > 0) {
				const successChance = Math.random() * 100;
				if (successChance <= $fishingLevel) {
					addFishAndRemoveBait();
					//addMessage('Caught a fish!');
				} else {
					addMessage('Failed to catch a fish.');
				}
			} else {
				clearInterval(interval);
				stopFishing();
			}
		}, 10);
	}

	function addFishAndRemoveBait() {
		if ($bait > 0) {
			addRandomFish();
			removeBait(1);
		} else {
			stopFishing();
		}
	}

	function buyAllBait() {
		const maxBait = Math.floor($coins / baitPrice);
		if (maxBait > 0) {
			addBait(maxBait);
			removeCoins(maxBait * baitPrice);
			addMessage('Bought ' + maxBait + ' bait', true);
		} else {
			alert('Not enough coins');
		}
	}
</script>

<div class="flex h-screen flex-col items-start justify-between">
	<div class="w-full">
		<div class="my-2 flex gap-2">
			<p class="scale-150">{$isFishing ? '🟢' : '🔴'}</p>
			<p>Coins: {$coins.toFixed(2)}</p>
			<p>Bait: {$bait}</p>
		</div>

		<BasicButton text="Start" onclick={() => startFishing()} />
		<BasicButton text="Stop" onclick={() => stopFishing()} />
		<BasicButton text="Fishing Shop" onclick={openModal} />
		<div>
			<MessageLog />
		</div>
	</div>
	<div><SideBarBottom /></div>
</div>

<dialog id="my_modal_2" class="modal">
	<div class="modal-box">
		<p class="pb-6">Coins: {$coins.toFixed(2)}</p>
		{#if $totalWeight > 0}
			<BasicButton text={'Sell All (' + $inventory.length + ' fish)'} onclick={sellAllFish} />
		{/if}
		<BasicButton text={'Bait x1 - $' + baitPrice} onclick={buyBait} />

		<BasicButton text={'Buy All Bait ' + Math.floor($coins / baitPrice)} onclick={buyAllBait} />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
