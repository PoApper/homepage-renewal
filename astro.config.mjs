import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";
import rehypePrettyCode from 'rehype-pretty-code';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx({
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'catppuccin-latte',
        },
      ],
    ],
  }), tailwind(), react()]
});