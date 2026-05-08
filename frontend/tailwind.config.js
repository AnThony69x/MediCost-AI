/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'hsl(var(--ink))',
        muted: 'hsl(var(--muted))',
        canvas: 'hsl(var(--canvas))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        'accent-soft': 'hsl(var(--accent-soft))',
        border: 'hsl(var(--border))',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.04)',
        glow: '0 0 20px rgba(13, 109, 102, 0.2)',
      },
    },
  },
  plugins: [],
}

