<script lang="ts">
	import BasicButton from './BasicButton.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
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
		inventory,
		totalFishCaught,
		totalCoinsGained,
		totalBaitAquired,
		totalWeightGained
	} from '$lib/fishStore';
	function openModal() {
		const modal = document.getElementById('my_modal_1');
		if (modal instanceof HTMLDialogElement) modal.showModal();
	}
</script>

<div class="flex flex-wrap gap-2">
	<BasicButton onclick={() => openModal()} text="Stats" />
	<ThemeSwitcher />
</div>

<dialog id="my_modal_1" class="modal">
	<div class="modal-box">
		<h3 class="mb-4 text-3xl font-semibold">Stats</h3>
		<div class="flex items-start justify-start gap-2">
			<div class="w-1/3">
				<p><span class="font-semibold">Coins:</span> {$coins.toFixed(2)}</p>
				<p><span class="font-semibold">Bait:</span> {$bait}</p>
				<p><span class="font-semibold">Fish:</span> {$inventory.length}</p>
				<p><span class="font-semibold">Weight:</span> {$totalWeight.toFixed(2)} lbs</p>
			</div>
			<div class="w-2/3">
				<p>
					<span class="font-semibold">Total Coins Acquired:</span>
					{$totalCoinsGained.toFixed(2)}
				</p>
				<p><span class="font-semibold">Total Bait Acquired:</span> {$totalBaitAquired}</p>
				<p><span class="font-semibold">Total Fish Caught:</span> {$totalFishCaught}</p>
				<p>
					<span class="font-semibold">Total Weight Gained:</span>
					{$totalWeightGained.toFixed(2)} lbs
				</p>
			</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
