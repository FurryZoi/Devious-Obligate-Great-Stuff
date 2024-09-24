import { getModVersion } from "@/index";
import { chatSendDOGSMessage, getPlayer } from "./utils";
import { hookFunction } from "./bcModSdk";

export interface IModStorage {
    remoteControl: {
        state?: boolean
        permission?: 0 | 1 | 2
    },
    deviousPadlock: {
        state?: boolean
        permission?: 0 | 1 | 2
        itemGroups?: {} | Record<AssetGroupName, {
            item: ServerItemBundle
            owner: number
            accessPermission?: 0 | 1 | 2 | 3
            memberNumbers?: number[]
            note?: string
            unlockTime?: number
        }>
    },
    version: string
}

export let modStorage: IModStorage;
let modStorageSaveString: string;

export function initStorage(): void {
    const data = {
        remoteControl: {},
        deviousPadlock: {},
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

    hookFunction("ChatRoomMessage", 20, (args, next) => {
        const message = args[0];
        const sender = getPlayer(message.Sender);
        if (!sender) return next(args);
        if (message.Content === "dogsMsg" && !sender.IsPlayer()) {
            const msg = message.Dictionary.msg;
            const data = message.Dictionary.data;
            if (msg === "syncStorage") {
                if (!sender.DOGS) {
                    console.log("sync 1")
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
        console.log("sync 2")
        chatSendDOGSMessage("syncStorage", {
            storage: modStorage,
        });
    });
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
    console.log(modStorage);
}


setInterval(updateModStorage, 800);
