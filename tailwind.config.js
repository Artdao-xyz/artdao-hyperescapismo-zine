/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				monda:
					"MondaVariable, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
				garamond:
					"GaramondVariable, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
			},
			boxShadow: {
				cloud: 'inset 0px 0px 8.0px 0.5px rgb(255, 255, 255, 0.75)'
			},
			dropShadow: {
				cloud: '0 5px 5px rgba(255, 255, 255,0.5)'
			},
			screens: {
				'md': '850px', // Change '900px' to your desired breakpoint
			},
		}
	},
	plugins: []
};
