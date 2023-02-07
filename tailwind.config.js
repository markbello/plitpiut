/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,html}',
    './components/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      minWidth: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        ['2xl']: '1536px'
      },
      width: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        ['2xl']: '1536px'
      },
      fontSize: {
        display1: [
          '3rem',
          {
            lineHeight: '1',
            fontWeight: '700'
          }
        ],
        display2: [
          '2.5rem',
          {
            lineHeight: '2.5rem',
            fontWeight: '700'
          }
        ],
        display3: [
          '1.5rem',
          {
            lineHeight: '2rem',
            fontWeight: '700'
          }
        ],
        display4: [
          '1.125rem',
          {
            lineHeight: '1',
            fontWeight: '600'
          }
        ]
      }
    }
  },
  plugins: []
}
