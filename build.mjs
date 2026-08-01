import { build } from "esbuild";
import dotenv from "dotenv";
import fs from "fs";
import copy from "esbuild-plugin-copy";

if (fs.existsSync("dist")) fs.rmSync("dist", { recursive: true, force: true });
else fs.mkdirSync("dist");

const envFile = fs.readFileSync(".env", "utf-8");
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
    plugins: [
        copy({
            resolveFrom: "cwd",
            assets: {
                from: ["./localization/*"],
                to: ["./dist/localization"]
            }
        })
    ]
}).catch(() => process.exit(1));