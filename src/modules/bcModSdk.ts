import bcModSdk, { PatchHook, ModSDKModInfo, GetDotedPathType } from "bondage-club-mod-sdk";
import { getModVersion } from "@/index";

const modSdk = bcModSdk.registerMod({
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

export function callOriginal<TFunctionName extends string>(
	target: TFunctionName,
	args: [...Parameters<GetDotedPathType<typeof globalThis, TFunctionName>>],
	context?: any
): ReturnType<GetDotedPathType<typeof globalThis, TFunctionName>> {
	return modSdk.callOriginal(target, args);
}

export function getActiveMods(): ModSDKModInfo[] {
    return bcModSdk.getModsInfo();
}

export function findModByName(name: string): boolean {
    return !!bcModSdk.getModsInfo().find((m) => m.name === name);
}