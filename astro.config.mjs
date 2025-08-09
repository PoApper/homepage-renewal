import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import rehypePrettyCode from 'rehype-pretty-code'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: 'catppuccin-latte',
          },
        ],
      ],
    }),
    tailwind(),
    react(),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  site: 'https://poapper.club',
})
