// @ts-check
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",

  //.env
  env: {
    schema: {
      KEY: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },

  adapter: vercel(),
});
