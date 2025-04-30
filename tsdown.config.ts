import type { Options } from "tsdown";

import { defineConfig } from "tsdown";

const configs: Options[] = [
  // Config 1: CJS Output (Main code)
  {
    clean: true,
    entry: ["src/**/*", "!**/image*/**", "!**/*image*/**"],
    external: ["fs", "path", "react", "react-dom"],
    format: ["cjs"],
    minify: false,
    outDir: "dist/cjs",
    //  outExtensions: () => ({ js: ".cjs" }),
    sourcemap: true,
    target: "esnext",
    tsconfig: "./tsconfig.json",
  },

  // Config 2: ESM Output (Main code + DTS for main code)
  {
    clean: true,
    dts: true,
    entry: ["src/**/*", "!**/image*/**", "!**/*image*/**"],
    external: ["fs", "path", "react", "react-dom"],
    format: ["esm"],
    minify: false,
    outDir: "dist/esm",
    outputOptions: {
      chunkFileNames: "[name].js",
    },
    sourcemap: true,
    target: "esnext",
    tsconfig: "./tsconfig.json",
  },
];

export default defineConfig(configs);
