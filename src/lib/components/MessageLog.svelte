<!-- MessageLog.svelte -->
<script lang="ts">
	import { messages } from '$lib/fishStore';

	let messageContainer: HTMLDivElement;

	function getFormattedTime(): string {
		const now = new Date();
		return now.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true
		});
	}

	function scrollToBottom() {
		if (messageContainer) {
			messageContainer.scrollTop = messageContainer.scrollHeight;
		}
	}

	$: if ($messages) {
		setTimeout(scrollToBottom, 0);
	}
</script>

<div
	bind:this={messageContainer}
	id="messageLog"
	class="h-[80vh] w-full overflow-y-auto border p-2"
>
	{#each [...$messages].reverse() as message}
		<div>
			<span class="text-xs text-gray-500">[{getFormattedTime()}] </span>
			{#if message.bold}
				<b>{message.text}</b>
			{:else}
				{message.text}
			{/if}
		</div>
	{/each}
</div>
