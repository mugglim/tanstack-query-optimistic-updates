import { defineConfig } from "vitest/config";
import packageJson from "./package.json";

export default defineConfig({
  test: {
    setupFiles: ["./test-setup.ts"],
    environment: "happy-dom",
    name: packageJson.name,
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8"
    }
  }
});
