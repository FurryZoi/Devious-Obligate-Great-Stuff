import { getModVersion } from "@/index";
import { getPlayer, MOD_DATA } from "zois-core";
import { messagesManager } from "zois-core/messaging";
import { hookFunction, HookPriority } from "zois-core/modsApi";
import { RemoteConnectMinimumRole } from "./remoteControl";
import { PutPadlockMinimumRole, KeyHolderMinimumRole, BasePadlock, DeviousPadlockSettings } from "./deviousPadlock";
import { cloneDeep } from "lodash-es";


export type SavedItem = {
    name: string
    color?: ItemColor
    craft?: CraftingItem
    property?: ItemProperties
}

export interface DeviousPadlockProfile {
    name: string
    baseLock?: BasePadlock
    minimumRole?: KeyHolderMinimumRole
    memberNumbers?: number[]
    note?: string
    preventCheatCommands?: boolean
    // Legacy field kept for storage migration support.
    blockedCommands?: string[]
    unlockTime?: string
    combination?: {
        type: "PIN-Code" | "password"
        value: string
    }
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
        profiles?: DeviousPadlockProfile[]
        synced?: (
            Omit<DeviousPadlockSettings, "item" | "owner"> & {
                groupNames: AssetGroupItemName[]
            }
        )[]
        itemGroups?: Partial<Record<AssetGroupItemName, DeviousPadlockSettings>>
    },
    misc: {
        autoShowChangelog?: boolean
        deleteLocalMessages?: boolean
    }
    version: string
}


export let modStorage: ModStorage;

const VALID_MINIMUM_ROLES = new Set<number>(
    Object.values(KeyHolderMinimumRole).filter((value): value is number => typeof value === "number")
);

function normalizeBasePadlock(value: unknown): BasePadlock | undefined {
    if (typeof value !== "string") return undefined;
    if ((Object.values(BasePadlock) as string[]).includes(value)) {
        return value as BasePadlock;
    }
    const normalizedValue = value.toLowerCase();
    if (normalizedValue.includes("owner")) return BasePadlock.OWNER;
    if (normalizedValue.includes("lover")) return BasePadlock.LOVERS;
    if (normalizedValue.includes("exclusive")) return BasePadlock.EXCLUSIVE;
    return undefined;
}

function normalizeMinimumRole(baseLock: BasePadlock, value: unknown): KeyHolderMinimumRole {
    const numericValue = typeof value === "number"
        ? value
        : typeof value === "string"
            ? Number(value)
            : undefined;
    const currentMinimumRole = numericValue !== undefined && Number.isInteger(numericValue) && VALID_MINIMUM_ROLES.has(numericValue)
        ? numericValue as KeyHolderMinimumRole
        : undefined;

    if (baseLock === BasePadlock.LOVERS) {
        if (currentMinimumRole === KeyHolderMinimumRole.OWNER) return currentMinimumRole;
        return KeyHolderMinimumRole.LOVER;
    }
    if (baseLock === BasePadlock.OWNER) return KeyHolderMinimumRole.OWNER;
    return currentMinimumRole ?? KeyHolderMinimumRole.EVERYONE_EXCEPT_WEARER;
}

function migrateLegacyPadlockConfig(config: Record<string, any>, withItemData = false): void {
    const baseLock = normalizeBasePadlock(
        config.baseLock ??
        config.lockedBy ??
        config.basePadlock ??
        config.item?.property?.LockedBy
    ) ?? BasePadlock.EXCLUSIVE;

    config.baseLock = baseLock;
    config.minimumRole = normalizeMinimumRole(baseLock, config.minimumRole);
    if (baseLock !== BasePadlock.EXCLUSIVE) {
        config.memberNumbers = [];
    }

    if (withItemData && config.item && typeof config.item === "object") {
        config.item.property ??= {};
        config.item.property.LockedBy = baseLock;
        if (typeof config.owner === "number") {
            config.item.property.LockMemberNumber = config.owner;
        }
    }
}

export function initStorage(): void {
    const defaults = {
        remoteControl: {},
        deviousPadlock: {},
        misc: {},
        version: getModVersion(),
    };

    try {
        if (typeof Player.ExtensionSettings.DOGS === "string") {
            const data = LZString.decompressFromBase64(Player.ExtensionSettings.DOGS)
            if (data) modStorage = JSON.parse(data);
        }
    } catch (error) {
        console.error('DOGS failed to initialize storage:', error);
    } finally {
        modStorage ??= defaults
    }

    for (const key in defaults) {
        // @ts-expect-error Make sure we get defaults if the key ends up missing
        modStorage[key] ??= defaults[key];
    }

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
        const ret = next(args);
        messagesManager.sendPacket("syncStorage", {
            storage: modStorage,
        });
        return ret;
    });
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
            if (d.accessPermission !== undefined) {
                d.minimumRole = d.accessPermission;
                delete d.accessPermission;
            }
            if (Array.isArray(d.blockedCommands)) {
                delete d.blockedCommands;
            }
            migrateLegacyPadlockConfig(d, true);
            delete d.item.Difficulty;
            delete d.item.Group;
        });
    }
    if (Array.isArray(modStorage.deviousPadlock.profiles)) {
        modStorage.deviousPadlock.profiles.forEach((profile) => {
            const legacyBlockedCommands = (profile as unknown as Record<string, unknown>).blockedCommands;
            if (Array.isArray(legacyBlockedCommands)) {
                delete (profile as unknown as Record<string, unknown>).blockedCommands;
            }
            migrateLegacyPadlockConfig(profile as Record<string, any>);
        });
    }
    if (Array.isArray(modStorage.deviousPadlock.synced)) {
        modStorage.deviousPadlock.synced.forEach((config) => {
            const legacyBlockedCommands = (config as Record<string, unknown>).blockedCommands;
            if (Array.isArray(legacyBlockedCommands)) {
                delete (config as Record<string, unknown>).blockedCommands;
            }
            config.groupNames = [...new Set(config.groupNames ?? [])];
            migrateLegacyPadlockConfig(config as Record<string, any>);
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
