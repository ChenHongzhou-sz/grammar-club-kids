/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        cloud: '#f8fbff',
        skysoft: '#eaf5ff',
        mintsoft: '#eafaf0',
        peachsoft: '#fff3e8'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(38, 72, 112, 0.10)'
      }
    }
  },
  plugins: []
};
