import { defineConfig } from "vite";
import preserveDirectives from "rollup-preserve-directives";

import packageJson from "./package.json";

const rollupOptionsExternal = [...Object.keys(packageJson.peerDependencies)].flatMap((dep) => [
  dep,
  new RegExp(`^${dep}/.*`)
]);

export default defineConfig({
  plugins: [preserveDirectives()],
  build: {
    lib: {
      entry: {
        index: "./src/index.ts"
      }
    },
    rollupOptions: {
      external: rollupOptionsExternal,
      output: [
        { format: "es", dir: "dist/esm", chunkFileNames: "[name].mjs" },
        { format: "cjs", dir: "dist/cjs" }
      ]
    }
  }
});
