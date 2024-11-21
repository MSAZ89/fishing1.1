<script lang="ts">
	import { inventory, totalWeight, removeFish, sellAllFish } from '$lib/fishStore';
	import BasicButton from './BasicButton.svelte';
</script>

<div class="p-4 text-primary-content">
	<p>Total Weight: {$totalWeight.toFixed(2)} lbs</p>
	{#if $inventory.length === 0}
		<p>No fish in inventory</p>
	{/if}
	{#if $inventory.length > 0}
		<p>Inventory:</p>
	{/if}
	<ul class="grid grid-cols-4 gap-2">
		{#each $inventory as fish, index}
			<li
				class="my-2 flex items-center justify-between divide-y divide-dashed rounded-xl border bg-gray-200 px-2 py-2 text-black"
			>
				<div>
					<div>{fish.name}</div>
					<div>Weight: {fish.minWeight.toFixed(2)} lbs</div>
				</div>
				<button
					class="btn btn-sm ml-2 border-primary hover:bg-primary hover:text-primary-content"
					onclick={() => removeFish(index)}>🔙</button
				>
			</li>
		{/each}
	</ul>
</div>
