<script lang="ts">
	import { inventory, totalWeight, removeFish } from '$lib/fishStore';
</script>

<div class="p-4 text-primary-content">
	<div class="flex gap-4">
		<p>Total Weight: {$totalWeight.toFixed(2)} lbs</p>
		<p>Fish Count: {$inventory.length}</p>
	</div>
	{#if $inventory.length === 0}
		<p>No fish in inventory</p>
	{/if}

	<ul class="grid max-h-[90vh] grid-cols-5 gap-2 overflow-y-scroll">
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
