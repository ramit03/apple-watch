import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		screens:{
			'sm': {'max': '736px'},
			'md': {'min': '768px', 'max': '1023px'},
			'landscape': {'raw': '(orientation: landscape)'},
		},
  		colors: {
  			text: '#1d1d1f',
			button: {
				primary: '#0071e3',
			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  	},
  },
  variants: {
    extend: {
      height: ['landscape'],
      transform: ['landscape'],
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
