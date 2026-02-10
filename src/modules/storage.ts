import { getModVersion } from "@/index";
import { getPlayer, MOD_DATA } from "zois-core";
import { messagesManager } from "zois-core/messaging";
import { hookFunction, HookPriority } from "zois-core/modsApi";
import { RemoteConnectMinimumRole } from "./remoteControl";
import { PutPadlockMinimumRole, KeyHolderMinimumRole, BasePadlock } from "./deviousPadlock";
import { cloneDeep } from "lodash-es";


export type SavedItem = {
    name: string
    color: ItemColor
    craft: CraftingItem
    property: ItemProperties
}

export interface ModStorage {
    remoteControl: {
        state?: boolean
        notifyOthers?: boolean
        connectMinimumRole?: RemoteConnectMinimumRole
    },
    deviousPadlock: {
        state?: boolean
        putMinimumRole?: PutPadlockMinimumRole
        itemGroups?: Record<AssetGroupItemName, {
            item: SavedItem
            owner: number
            baseLock?: BasePadlock
            minimumRole?: KeyHolderMinimumRole
            memberNumbers?: number[]
            note?: string
            blockedCommands?: string[]
            unlockTime?: string
            combination?: {
                type: "PIN-Code" | "password"
                hash: string
            }
        }>
    },
    misc: {
        autoShowChangelog?: boolean
        deleteLocalMessages?: boolean
    }
    version: string
}


export let modStorage: ModStorage;

export function initStorage(): void {
    const data = {
        remoteControl: {},
        deviousPadlock: {},
        misc: {},
        version: getModVersion(),
    };

    if (typeof Player.ExtensionSettings.DOGS === "string") {
        modStorage = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.DOGS)) ?? data;
    } else modStorage = data

    Object.keys(data).forEach((key) => {
        if (modStorage[key] === undefined) {
            modStorage[key] = data[key];
        }
    });

    migrateModStorage();
    messagesManager.sendPacket("syncStorage", {
        storage: modStorage,
    });

    messagesManager.onPacket("syncStorage", (data, sender) => {
        if (!sender.DOGS) {
            messagesManager.sendPacket("syncStorage", {
                storage: modStorage
            }, sender.MemberNumber);
        }
        sender.DOGS = data.storage;
    });

    hookFunction("ChatRoomSync", HookPriority.OBSERVE, (args, next) => {
        next(args);
        messagesManager.sendPacket("syncStorage", {
            storage: modStorage,
        });
    });

    //@ts-ignore
    // window.modStorage = modStorage;
}

function migrateModStorage(): void {
    if (typeof modStorage.deviousPadlock.itemGroups === "object") {
        Object.values(modStorage.deviousPadlock.itemGroups as object).forEach((d) => {
            if (d.item.Name) {
                d.item.name = d.item.Name;
                delete d.item.Name;
            }
            if (d.item.Color) {
                d.item.color = d.item.Color;
                delete d.item.Color;
            }
            if (d.item.Craft) {
                d.item.craft = d.item.Craft;
                delete d.item.Craft;
            }
            if (d.item.Property) {
                d.item.property = d.item.Property;
                delete d.item.Property;
            }
            if (d.accessPermission) {
                d.minimumRole = d.item.accessPermission;
                delete d.accessPermission;
            }
            delete d.item.Difficulty;
            delete d.item.Group;
        });
    }
    //@ts-ignore
    if (typeof modStorage.remoteControl.permission === "number") {
        //@ts-ignore
        modStorage.remoteControl.connectMinimumRole = modStorage.remoteControl.permission;
        //@ts-ignore
        delete modStorage.remoteControl.permission;
    }
    //@ts-ignore
    if (typeof modStorage.deviousPadlock.permission === "number") {
        //@ts-ignore
        modStorage.deviousPadlock.putMinimumRole = modStorage.deviousPadlock.permission;
        //@ts-ignore
        delete modStorage.deviousPadlock.permission;
    }
    syncStorage();
}


export function syncStorage(): void {
    if (typeof modStorage !== "object") return;
    Player.ExtensionSettings.DOGS = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("DOGS");
    messagesManager.sendPacket("syncStorage", {
        storage: modStorage,
    });
}
