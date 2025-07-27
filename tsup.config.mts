import { defineConfig, Format, Options } from "tsup";

const entries: Options["entry"] = {
  index: "./src/index.ts"
};

const sharedConfig: Options = {
  entry: entries,
  dts: { only: true }
};

const createConfig = (format: Exclude<Format, "iife">) => {
  return defineConfig({
    ...sharedConfig,
    format: [format],
    outDir: `./dist/${format}`
  });
};

export default [createConfig("esm"), createConfig("cjs")];
