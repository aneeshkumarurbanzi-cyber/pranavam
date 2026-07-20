import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bk: '#FAF8F4',
        dk: '#F2EDE3',
        dk2: '#E8E0D0',
        gold: '#9A7B1E',
        gb: '#C9A227',
        saf: '#C45B1A',
        temple: '#7B1E2E',
        cr: '#1C1512',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        jakarta: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
