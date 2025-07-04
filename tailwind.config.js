/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Calming color palette
        'misty-blue': {
          50: '#f8fbfc',
          100: '#f1f7f9',
          200: '#e6f0f3',
          300: '#d1e4ea',
          400: '#b8d5dd',
          500: '#9bc4ce',
          600: '#7db0bc',
          700: '#6a9aa8',
          800: '#5a8290',
          900: '#4d6d77',
        },
        'soft-sage': {
          50: '#f7f9f7',
          100: '#eff3ef',
          200: '#d7e6d5',
          300: '#c4d9c1',
          400: '#a8c7a4',
          500: '#8bb485',
          600: '#6fa066',
          700: '#5a8552',
          800: '#4a6d43',
          900: '#3e5a38',
        },
        'muted-teal': {
          50: '#f4f8f7',
          100: '#e9f1ef',
          200: '#d3e3df',
          300: '#b3cfc8',
          400: '#8fb6ad',
          500: '#6fa7a1',
          600: '#5a8a84',
          700: '#4a706c',
          800: '#3e5a57',
          900: '#354a48',
        },
        // Message bubble colors
        'user-bubble': '#AEDFEA',
        'bot-bubble': '#F7F4EF',
      },
      fontSize: {
        'heading-sm': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-md': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-lg': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-sm': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      animation: {
        'typing': 'typing 1.5s infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-gentle': 'pulseGentle 2s infinite',
      },
      keyframes: {
        typing: {
          '0%, 60%': { opacity: '1' },
          '30%': { opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};