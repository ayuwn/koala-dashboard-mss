/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['"Geist"', '"Geist Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // KOALA COLOR PALETTE
        koala: {
          blue: {
            900: '#024981', // Dark Navy Primary
            800: '#0069A7', // Deep Ocean Blue
            700: '#4088C2', // Slate Cyan Blue
            600: '#58ACFF', // Electric Accent Blue
            500: '#94BDDD', // Muted Soft Blue
            300: '#B9DAFB', // Light Blue Ice
            200: '#AFDDFF', // Baby Sky
            100: '#D5E9FD', // Soft Surface Tint
            50:  '#F0F7FF', // Clean Tint
          },
          orange: {
            600: '#FF8428', // Vivid Koala Orange Accent
            500: '#FFA86A', // Warm Orange
            400: '#FDC49B', // Soft Peach
            200: '#FFECDB', // Light Orange Surface
            100: '#FEF1DF', // Pale Orange Background
          },
          alert: {
            red: '#BA0404',
            redLight: '#FFE4EA',
          },
          status: {
            green: '#539D5A',
            greenLight: '#E2FFE4',
          },
        }
      },
      boxShadow: {
        'glossy': '0 4px 20px -2px rgba(2, 73, 129, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95)',
        'glossy-hover': '0 8px 30px -4px rgba(2, 73, 129, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.04), inset 0 1px 1.5px 0 rgba(255, 255, 255, 1)',
        'glossy-sm': '0 2px 8px -1px rgba(2, 73, 129, 0.04), inset 0 1px 0.5px 0 rgba(255, 255, 255, 0.9)',
        'glossy-btn': '0 2px 10px -1px rgba(2, 73, 129, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.25)',
        'glossy-btn-orange': '0 2px 10px -1px rgba(255, 132, 40, 0.35), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
      },
      borderRadius: {
        'lg': '0.625rem',
        'xl': '0.875rem',
        '2xl': '1.125rem',
      }
    },
  },
  plugins: [],
}
