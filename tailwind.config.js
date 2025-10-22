/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['var(--font-montserrat)', 'sans-serif'],
        'secondary': ['var(--font-roboto)', 'sans-serif'],
        'sans': ['var(--font-montserrat)', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'tighter': '-0.025em',
        'tight': '-0.0125em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'ultra': '0.15em',
      },
      colors: {
        'accent': {
          DEFAULT: '#c42723',
          50: '#fdf2f2',
          100: '#fce7e6',
          200: '#f9d2d1',
          300: '#f4aeac',
          400: '#ec7d7a',
          500: '#e04e4a',
          600: '#cd2e2a',
          700: '#c42723',
          800: '#a01e1b',
          900: '#851c1a',
        },
        'secondary': {
          DEFAULT: '#fdca40',
          50: '#fffef7',
          100: '#fffbeb',
          200: '#fef5c7',
          300: '#feea98',
          400: '#fdda63',
          500: '#fdca40',
          600: '#fcb916',
          700: '#e09f10',
          800: '#b7810f',
          900: '#946914',
        },
        'gabardo-blue': {
          DEFAULT: '#132D51',
          50: '#e8f2ff',
          100: '#d6e7ff',
          200: '#b5d2ff',
          300: '#89b6ff',
          400: '#5c8cff',
          500: '#385eff',
          600: '#2440f5',
          700: '#1e30d8',
          800: '#1d2aae',
          900: '#132D51',
        },
        'gabardo-light-blue': {
          DEFAULT: '#38B6FF',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#38B6FF',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      }
    },
  },
  plugins: [],
}

