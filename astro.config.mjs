// @ts-check
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

import netlify from "@astrojs/netlify";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",

  //.env
  env: {
    schema: {
      API_KEY: envField.string({
        context: "server",
        access: "public",
      }),
      API_FETCH_GET: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },

  adapter: vercel(),
});
