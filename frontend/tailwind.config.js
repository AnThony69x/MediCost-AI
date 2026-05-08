/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f2430',
        muted: '#5b606c',
        surface: '#ffffff',
        canvas: '#f7f4ef',
        accent: '#0f766e',
        accentSoft: '#e4f3f1',
        info: '#3b82f6',
        stroke: 'rgba(31, 36, 48, 0.12)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
      },
      boxShadow: {
        soft: '0 10px 24px rgba(31, 36, 48, 0.08)',
        medium: '0 12px 30px rgba(31, 36, 48, 0.12)',
        strong: '0 18px 40px rgba(31, 36, 48, 0.18)',
      },
      borderRadius: {
        xl: '20px',
        '2xl': '28px',
      },
    },
  },
  plugins: [],
}
