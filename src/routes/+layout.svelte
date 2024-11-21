<script lang="ts">
	import '../app.css';
	import SideBar from '$lib/components/sideBar.svelte';
	let { children } = $props();
</script>

<div class="flex p-4">
	<div class="w-2/3">{@render children()}</div>
	<div class="w-1/3">
		<SideBar />
	</div>
</div>
