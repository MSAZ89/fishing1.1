<script lang="ts">
	import '../app.css';
	import SideBar from '$lib/components/sideBar.svelte';
	let { children } = $props();
</script>

<div class="flex min-h-screen">
	<div class="w-3/4">{@render children()}</div>
	<div class="w-1/4">
		<SideBar />
	</div>
</div>
