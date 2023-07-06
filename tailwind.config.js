/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts}"
	],
	theme: {
		extend: {
			colors: {
				'dark-theme': '#091b27',
				'green-theme': '#079258',
				'green-ligth-theme': '#08dc85',
				'yellow-theme': '#ffc409',
				'soft-green': '#091b27e3',
				'soft-yellow': '#e0b10c'
			},
			textColor: {
				'dark-theme': '#091b27',
				'yellow-theme': '#ffc409'
			}
		},
	},
	plugins: [],
}
