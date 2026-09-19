import http from "http";
import fs from "fs";
import path from "path";
import { execSync, spawn, spawnSync } from "child_process";
import chalk from "chalk";
import open from "open";

const PORT = 8000;
const DIST_DIR = path.resolve("./dist");

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
};

const USERSCRIPT = `
// ==UserScript==
// @name Zoi's mods dev loader
// @namespace https://www.bondageprojects.com/
// @version 1.0.0
// @description Loader of Zoi's mods in development mod
// @author Zoi
// @match https://*.bondageprojects.elementfx.com/*
// @match https://*.bondage-europe.com/*
// @match https://*.bondageeurope.com/*
// @match https://*.bondageprojects.com/*
// @run-at document-end
// @grant none
// ==/UserScript==

setTimeout(function(){
    let n=document.createElement("script");
    n.setAttribute("language","JavaScript");
    n.setAttribute("crossorigin","anonymous");
    n.setAttribute("src","http://localhost:${PORT}/bundle.js");
    n.onload=()=>n.remove();
    document.head.appendChild(n);
}, 1000);
`

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json",
    ".map": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".txt": "text/plain; charset=utf-8",
};

function getMimeType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return mimeTypes[ext] || "application/octet-stream";
}

function send404(res) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", ...CORS_HEADERS });
    res.end("404 Not Found >.<");
}

const server = http.createServer((req, res) => {
    const safeUrl = decodeURIComponent(req.url.split("?")[0]);

    if (safeUrl === "/dev.user.js") {
        res.writeHead(200, {
            "Content-Type": mimeTypes[".js"],
            "Cache-Control": "no-cache",
            ...CORS_HEADERS
        });
        res.end(USERSCRIPT);
        return;
    }

    let filePath = path.join(DIST_DIR, safeUrl === "/" ? "index.html" : safeUrl);

    filePath = path.normalize(filePath);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            if (!err && stats.isDirectory()) {
                const indexPath = path.join(filePath, "index.html");
                return fs.stat(indexPath, (err2, stats2) => {
                    if (err2 || !stats2.isFile()) return send404(res);
                    serveFile(indexPath, res);
                });
            }
            return send404(res);
        }
        serveFile(filePath, res);
    });
});

function serveFile(filePath, res) {
    res.writeHead(200, {
        "Content-Type": getMimeType(filePath),
        "Cache-Control": "no-cache",
        ...CORS_HEADERS
    });
    fs.createReadStream(filePath).pipe(res);
}

server.listen(PORT, () => {
    printDetails();
});

function printDetails() {
    console.log(`${chalk.magenta("Serving:")} ${chalk.cyan(DIST_DIR)} ${chalk.magenta("at")} ${chalk.cyan(`http://localhost:${PORT}`)}`);
    console.log(chalk.cyan("[r]"), "— Rebuild (Runs pnpm build --dev)");
    console.log(chalk.cyan("[i]"), "— Install loader userscript");
    console.log(chalk.cyan("[q]"), "— Quit\n");
}

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", (key) => {
    if (key.toLowerCase() === "q") {
        console.log(chalk.red("Shutting down server..."));
        server.close(() => process.exit(0));
        return;
    }

    if (key.toLowerCase() === "r") {
        execSync("pnpm build:dev", { shell: true, stdio: "inherit" });
        console.log("\n");
        printDetails();
    }

    if (key.toLowerCase() === "i") {
        open(`http://localhost:${PORT}/dev.user.js`);
    }
});
