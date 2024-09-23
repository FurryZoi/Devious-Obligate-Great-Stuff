import bcModSdk, { PatchHook } from "bondage-club-mod-sdk";
import { modVersion } from "@/index";

const modSdk  = bcModSdk.registerMod({
    name: "DOGS",
    fullName: "Devious Obligate Great Stuff",
    version: "1.0.0",
    repository: ""
});

export function hookFunction(functionName: string, priority: number, hook: PatchHook): () => void {
    return modSdk.hookFunction(functionName, priority, hook);
}

export function patchFunction(functionName: string, patches: Record<string, string | null>): void {
    modSdk.patchFunction(functionName, patches);
}