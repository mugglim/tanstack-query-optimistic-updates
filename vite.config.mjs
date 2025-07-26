import { defineConfig } from "vite";

import packageJson from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: {
        react: "./src/react/index.ts"
      }
    },
    rollupOptions: {
      output: [{ format: "es", dir: "dist/esm" }]
    }
  }
});
