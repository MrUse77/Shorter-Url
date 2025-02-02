// @ts-check
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "http://localhost:4321",

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