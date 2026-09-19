import { build } from "esbuild";
import fs from "fs";
import copy from "esbuild-plugin-copy";
import chalk from "chalk";
import path from "path";

const args = process.argv.slice(2);

if (fs.existsSync("dist")) fs.rmSync("dist", { recursive: true, force: true });
else fs.mkdirSync("dist");

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

await build({
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
    format: "iife",
    tsconfig: "./tsconfig.json",
    define: {
        IS_DEV: args.includes("--dev") ? "true" : "false"
    },
    banner: {
        js: `// DOGS: Devious Obligate Great Stuff
if (typeof window.ImportBondageCollege !== "function") {
  alert("Club not detected! Please only use this while you have Club open!");
  throw "Dependency not met";
}`
    },
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

console.log(chalk.green("Build completed:\n"));
const files = fs.readdirSync("dist", { recursive: true, withFileTypes: true });
for (const file of files) {
    if (file.isFile()) {
        const { size } = fs.statSync(path.join(file.parentPath, file.name));
        console.log(chalk.magenta("+") + " " + chalk.yellow(file.parentPath) + "/" + chalk.cyan(file.name) + " " + chalk.grey(formatSize(size)))
    }
}

if (args.includes("--dev")) {
    console.log(chalk.grey("\nDevelopment Build"))
} else {
    console.log(chalk.grey("\nProduction Build (Add --dev to make development build)"));
}