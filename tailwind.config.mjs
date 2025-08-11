/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Noto Sans KR',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.gray.900'),
              textDecoration: 'underline',
              '&:hover': { color: theme('colors.gray.700') },
            },
            h1: { fontWeight: '800' },
            h2: { fontWeight: '800' },
            h3: { fontWeight: '700' },
            code: {
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.35em',
              borderRadius: '0.25rem',
            },
            pre: { lineHeight: '1.6' },
            img: { margin: '1rem auto' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
