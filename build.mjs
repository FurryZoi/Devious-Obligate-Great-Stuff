import { build } from "esbuild";
import dotenv from "dotenv";
import { readFileSync } from "fs";

const envFile = readFileSync(".env", "utf-8");
const envConfig = dotenv.parse(envFile);

const define = {};
for (const key in envConfig) {
    define[`ENV_VARS.${key}`] = JSON.stringify(envConfig[key]);
}

define["ENV_VARS"] = JSON.stringify(envConfig);

build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    sourcemap: true,
    outfile: "./dist/bundle.js",
    loader: {
        ".ts": "ts",
        ".css": "text",
        ".png": "dataurl",
        ".svg": "dataurl",
        ".ttf": "dataurl",
    },
    platform: "browser",
    tsconfig: "./tsconfig.json",
    define,
}).catch(() => process.exit(1));