import { defineConfig, type Options } from "tsdown";

const commonOptions: Omit<
    Options,
    | "clean"
    | "dts"
    | "entry"
    | "format"
    | "outDir"
    | "outExtensions"
    | "outputOptions"
> = {
    minify: false,
    platform: "node",
    sourcemap: true,
    tsconfig: "./tsconfig.json",
};

const commonOutputOptions = {
    chunkFileNames: "[name].js",
    entryFileNames: "[name].js",
};

export default defineConfig([
    {
        ...commonOptions,
        clean: true,
        dts: false,
        entry: ["src"],
        format: "cjs",
        outDir: "dist/cjs",
        outExtensions: () => ({ js: ".cjs" }),
        outputOptions: {
            ...commonOutputOptions,
            entryFileNames: "[name].js",
            exports: "named",
        },
    },
    {
        ...commonOptions,
        clean: true,
        dts: { resolve: true },
        entry: ["src"],
        format: "esm",
        outDir: "dist/esm",
        outputOptions: {
            ...commonOutputOptions,
            entryFileNames: "[name].js",
        },
        target: "esnext",
    },
]);
