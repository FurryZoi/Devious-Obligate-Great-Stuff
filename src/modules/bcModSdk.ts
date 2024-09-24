import bcModSdk, { PatchHook } from "bondage-club-mod-sdk";
import { getModVersion } from "@/index";

const modSdk  = bcModSdk.registerMod({
    name: "DOGS",
    fullName: "Devious Obligate Great Stuff",
    version: getModVersion(),
    repository: "https://github.com/FurryZoi/Devious-Obligate-Great-Stuff.git"
});

export function hookFunction(functionName: string, priority: number, hook: PatchHook): () => void {
    return modSdk.hookFunction(functionName, priority, hook);
}

export function patchFunction(functionName: string, patches: Record<string, string | null>): void {
    modSdk.patchFunction(functionName, patches);
}