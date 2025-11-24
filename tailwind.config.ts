import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
    './store/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1280px'
      }
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5b7cfd',
          foreground: '#0b1221',
          ring: '#a7b6ff'
        }
      },
      backgroundImage: {
        'glow-grid':
          'radial-gradient(circle at 20% 20%, rgba(91,124,253,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(45,212,191,0.25), transparent 40%)'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseGlow: {
          '0%,100%': { opacity: 0.6 },
          '50%': { opacity: 1 }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
