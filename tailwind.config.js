/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			accent: '#4A3931',
			accentHover: '#5D4D46',
			accentTextHover: '#897E79',
			dull: '#F6F4F2',
			dullHover: '#F3F0ED',
			textLessDull: '#88817E',
			textDull: '#A29C99',
			textDuller: '#A29C9980',
			bgColor: '#F9F8F5',
			bgColorBright: '#FBF9F7',
			borderColor: '#EBE6E1',
			white: '#ffffff',
			black: '#000000',
			transparent: 'transparent',
			error: '#D0230C'
		},
		extend: {
			fontFamily: {
				sans: ['Helvetica'],
				serif: ['QuincyCF']
			},
			container: {
				center: true,
				padding: '1.25rem'
			}
		}
	},
	plugins: []
};
