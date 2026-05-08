/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1f2e',
        muted: '#5c6270',
        surface: '#ffffff',
        surfaceMuted: '#fbf9f5',
        canvas: '#f5f2eb',
        accent: '#0d6d66',
        accentHover: '#0a5852',
        accentSoft: '#e0f2ef',
        accentGlow: '#b8e4dc',
        warm: '#e8c4a8',
        warmSoft: '#faf4ee',
        info: '#3b82f6',
        stroke: 'rgba(26, 31, 46, 0.1)',
        strokeStrong: 'rgba(26, 31, 46, 0.16)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 20px rgba(26, 31, 46, 0.06)',
        medium: '0 14px 32px rgba(26, 31, 46, 0.1)',
        strong: '0 22px 48px rgba(26, 31, 46, 0.14)',
        glow: '0 8px 28px rgba(13, 109, 102, 0.18)',
      },
      borderRadius: {
        xl: '20px',
        '2xl': '28px',
      },
    },
  },
  plugins: [],
}
