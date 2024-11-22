<script lang="ts">
	import { onMount } from 'svelte';
	import BasicButton from './BasicButton.svelte';

	let currentTheme = 'Emerald';

	function saveTheme(theme: string) {
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
		currentTheme = theme;
	}

	function loadTheme() {
		const savedTheme = localStorage.getItem('theme') || 'Emerald';
		saveTheme(savedTheme);
	}

	function openModal() {
		const modal = document.getElementById('theme_switcher');
		if (modal instanceof HTMLDialogElement) modal.showModal();
	}

	onMount(() => {
		loadTheme();
	});
</script>

<BasicButton onclick={() => openModal()} text="Theme Switcher" />

<dialog id="theme_switcher" class="modal">
	<div class="modal-box">
		<div class="form-control">
			<label class="label cursor-pointer gap-4">
				<span class="label-text">Emerald</span>
				<input
					type="radio"
					name="theme-radios"
					class="theme-controller radio"
					value="emerald"
					checked={currentTheme === 'emerald'}
					on:change={(e) => saveTheme(e.currentTarget.value)}
				/>
			</label>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer gap-4">
				<span class="label-text">Dark</span>
				<input
					type="radio"
					name="theme-radios"
					class="theme-controller radio"
					value="dark"
					checked={currentTheme === 'dark'}
					on:change={(e) => saveTheme(e.currentTarget.value)}
				/>
			</label>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer gap-4">
				<span class="label-text">Light</span>
				<input
					type="radio"
					name="theme-radios"
					class="theme-controller radio"
					value="light"
					checked={currentTheme === 'light'}
					on:change={(e) => saveTheme(e.currentTarget.value)}
				/>
			</label>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer gap-4">
				<span
					class="label-text
                ">Coffee</span
				>
				<input
					type="radio"
					name="theme-radios"
					class="theme-controller radio"
					value="coffee"
					checked={currentTheme === 'coffee'}
					on:change={(e) => saveTheme(e.currentTarget.value)}
				/>
			</label>
		</div>
		<div class="form-control">
			<label class="label cursor-pointer gap-4">
				<span
					class="label-text
                ">Forest</span
				>
				<input
					type="radio"
					name="theme-radios"
					class="theme-controller radio"
					value="forest"
					checked={currentTheme === 'forest'}
					on:change={(e) => saveTheme(e.currentTarget.value)}
				/>
			</label>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
