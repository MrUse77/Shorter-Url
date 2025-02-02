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
      API_KEY: envField.string({
        context: "server",
        access: "secret",
      }),
      API_FETCH_GET: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },

  adapter: vercel(),
});
