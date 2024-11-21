<script lang="ts">
	export let text: string;
	export let onclick: () => void;
</script>

<button
	{onclick}
	class="btn mb-2 border border-primary px-4 py-2 hover:bg-primary hover:text-primary-content"
	>{text}</button
>
