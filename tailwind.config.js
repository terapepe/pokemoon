/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#070B24',
        space: '#111A4D',
        nebula: '#24307A',
        volt: '#FFD93D',
        ember: '#FF8A1F',
        moon: '#FFF4CF',
      },
      fontFamily: {
        display: ['"Fredoka"', 'ui-rounded', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        twinkle: { '0%,100%': { opacity: '0.25' }, '50%': { opacity: '1' } },
        glow: { '0%,100%': { opacity: '0.55' }, '50%': { opacity: '1' } },
        drift: { from: { transform: 'translateX(-8%)' }, to: { transform: 'translateX(8%)' } },
        rocket: { '0%': { transform: 'translate(-20vw, 20vh) rotate(35deg)' }, '100%': { transform: 'translate(120vw, -60vh) rotate(35deg)' } },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        glow: 'glow 3.5s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite alternate',
        rocket: 'rocket 14s linear infinite',
      },
    },
  },
  plugins: [],
};
