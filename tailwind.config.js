import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        fontFamily: {
          'monda':
            "MondaVariable, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          'garamond':
            "GaramondVariable, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        },
        boxShadow: {
          'cloud': 'inset 0px 0px 5.0px 1px rgb(0 0 0 / 0.05)',
        },
      }
    },
    plugins: [daisyui]
  };