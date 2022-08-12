/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
}
