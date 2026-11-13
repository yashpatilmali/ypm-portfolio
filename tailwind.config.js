/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mario: {
          red: '#E52521',
          darkred: '#9B0000',
          blue: '#1E40AF',
          sky: '#38BDF8',
          night: '#070b14',
          deepsky: '#0f2757',
          ground: '#C2410C',
          green: '#10B981',
          gold: '#FBBF24',
          yellow: '#FCD34D',
          pipe: '#059669',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'bounce-gentle': 'bounceGentle 2.5s infinite ease-in-out',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'shine': 'shine 2s infinite',
      },
      keyframes: {
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.7))' },
          '50%': { filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.2))' },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
}
