import { getModVersion } from "@/index";
import { chatSendDOGSMessage, getPlayer } from "./utils";
import { hookFunction } from "./bcModSdk";
import { RemoteControlPermission } from "./remoteControl";
import { DeviousPadlockPermission } from "./deviousPadlock";

export type TSavedItem = {
    name: string
    color: ItemColor
    craft: CraftingItem
    property: ItemProperties
}

export interface IModStorage {
    remoteControl: {
        state?: boolean
        notifyOthers?: boolean
        permission?: RemoteControlPermission
    },
    deviousPadlock: {
        state?: boolean
        permission?: DeviousPadlockPermission
        itemGroups?: {} | Record<AssetGroupItemName, {
            item: TSavedItem
            owner: number
            accessPermission?: 0 | 1 | 2 | 3
            memberNumbers?: number[]
            note?: string
            unlockTime?: number
        }>
    },
    misc: {
        autoShowChangelog?: boolean
        deleteLocalMessages?: boolean
    }
    version: string
}

export let modStorage: IModStorage;
let modStorageSaveString: string;

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

    modStorageSaveString = JSON.stringify(modStorage);
    migrateModStorage();
    chatSendDOGSMessage("syncStorage", {
        storage: modStorage,
    });

    hookFunction("ChatRoomMessage", 20, (args, next) => {
        const message = args[0];
        const sender = getPlayer(message.Sender);
        if (!sender) return next(args);
        if (message.Content === "dogsMsg" && !sender.IsPlayer()) {
            const msg = message.Dictionary.msg;
            const data = message.Dictionary.data;
            if (msg === "syncStorage") {
                if (!sender.DOGS) {
                    chatSendDOGSMessage("syncStorage", {
                        storage: modStorage,
                    }, sender.MemberNumber);
                }
                sender.DOGS = data.storage;
            }
        }
        next(args);
    });
    
    hookFunction("ChatRoomSync", -20, (args, next) => {
        next(args);
        chatSendDOGSMessage("syncStorage", {
            storage: modStorage,
        });
    });

    // window.modStorage = modStorage;
}

function migrateModStorage(): void {
    if (typeof modStorage.deviousPadlock.itemGroups === "object") {
        Object.values(modStorage.deviousPadlock.itemGroups).forEach((d) => {
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
            delete d.item.Difficulty;
            delete d.item.Group;
        });
    }
}

function updateModStorage(): void {
    if (typeof modStorage !== "object") return;
	if (JSON.stringify(modStorage) === modStorageSaveString) return;
	modStorageSaveString = JSON.stringify(modStorage);
	Player.ExtensionSettings.DOGS = LZString.compressToBase64(JSON.stringify(modStorage));
	ServerPlayerExtensionSettingsSync("DOGS");
    chatSendDOGSMessage("syncStorage", {
        storage: modStorage,
    });
}

setInterval(updateModStorage, 800);
