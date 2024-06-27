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
      }
    },
    plugins: [daisyui]
  };