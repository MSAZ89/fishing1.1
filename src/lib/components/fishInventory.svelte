<script lang="ts">
	import { inventory, totalWeight, removeFish } from '$lib/fishStore';
</script>

<div class="m-4 p-2 text-primary-content">
	<div
		class="mb-4 flex items-center justify-center gap-4 rounded-xl bg-primary px-4 py-1 text-xl font-semibold"
	>
		<p>Total Weight: {$totalWeight.toFixed(2)} lbs</p>
		<p>Fish Count: {$inventory.length}</p>
		{#if $inventory.length === 0}
			<p>No fish in inventory</p>
		{/if}
	</div>

	<ul class="grid max-h-[88vh] grid-cols-5 gap-2 overflow-y-scroll">
		{#each $inventory as fish, index}
			<li
				class="my-1 flex items-center justify-between divide-y divide-dashed rounded-xl border border-primary bg-base-200 px-4 py-1 text-base-content"
			>
				<div>
					<div class="font-bold">{fish.name}</div>
					<div>Weight: {fish.minWeight.toFixed(2)} lbs</div>
				</div>
				<button
					class="btn btn-sm ml-2 hover:bg-primary hover:text-primary-content"
					onclick={() => removeFish(index)}>🔙</button
				>
			</li>
		{/each}
	</ul>
</div>
