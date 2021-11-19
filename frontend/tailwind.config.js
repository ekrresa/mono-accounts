module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				black: { DEFAULT: '#000000', 100: '#101010' },
				blue: { DEFAULT: '#182CD1', 100: '#5D66B0', 200: '#9DC8FF', 300: '#157AFF' },
				gray: {
					DEFAULT: '#D0D0D0',
					100: '#999999',
					200: '#DADADA',
					300: '#E6E8F1',
					400: '#515151',
				},
				red: { DEFAULT: '#F22828', 100: '#FFF4F4' },
				white: { DEFAULT: '#ffffff', sheer: '#E4E4E4' },
			},
			fontFamily: { sans: ['Duplicate Sans', 'sans-serif'] },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
