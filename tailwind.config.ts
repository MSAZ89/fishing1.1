import type { Config } from 'tailwindcss';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['light', 'dark', 'emerald', 'forest', 'coffee']
	},

	plugins: [require('daisyui')]
} satisfies Config;
