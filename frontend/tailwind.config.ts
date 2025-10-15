import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#f8feff',
        foreground: '#0a101a',
        accent: {
          primary: '#06b6d4',
          secondary: '#2dd4bf',
        },
        muted: '#9fbfc3',
        glass: {
          DEFAULT: 'rgba(12,18,26,0.82)',
          hover: 'rgba(10,14,20,0.92)',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(45,212,191,0.06)',
      },
      animation: {
        'gradient': 'gradientMove 6s ease infinite',
      },
    },
  },
  plugins: [],
}

export default config