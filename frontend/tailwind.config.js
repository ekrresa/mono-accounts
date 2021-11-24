module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false,
	theme: {
		extend: {
			boxShadow: { normal: ' 0px 4px 4px rgba(50, 50, 71, 0.06)' },
			colors: {
				black: { DEFAULT: '#000000', 100: '#101010', 200: '#273240', 300: '#404852' },
				blue: { DEFAULT: '#182CD1', 100: '#5D66B0', 200: '#9DC8FF', 300: '#157AFF' },
				gray: {
					DEFAULT: '#D0D0D0',
					100: '#999999',
					200: '#DADADA',
					300: '#E6E8F1',
					400: '#515151',
				},
				red: { DEFAULT: '#F22828', 100: '#FFF4F4' },
				white: { DEFAULT: '#ffffff', sheer: '#E4E4E4', sky: '#F2F6FF' },
			},
			dropShadow: {
				first:
					'0px 4.34461px 4.34461px rgba(50, 50, 71, 0.08) 0px 4.34461px 8.68923px rgba(50, 50, 71, 0.06)',
				l1: '0px 4.34461px 4.34461px rgba(50, 50, 71, 0.08)',
				l2: '0px 4.34461px 8.68923px rgba(50, 50, 71, 0.06)',
			},
			fontFamily: {
				sans: ['Duplicate Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
			},
			gridTemplateColumns: {
				dash: '1.2fr 1fr',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
