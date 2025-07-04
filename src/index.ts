import { initStorage, modStorage, syncStorage } from "@/modules/storage";
import { loadRemoteControl } from "@/modules/remoteControl";
import { loadSettingsMenu } from "@/modules/settingsMenu";
import { loadCommands } from "@/modules/commands";
import { loadDeviousPadlock } from "@/modules/deviousPadlock";
import { registerCore, isVersionNewer, waitFor } from "zois-core";
import css from "./styles.css";
import { toastsManager } from "zois-core/popups";
import { messagesManager } from "zois-core/messaging";
import { version } from "../package.json";


export function getModVersion(): string {
    return version;
}

export function chatSendChangelog(): void {
    const text = `<div class="dogsChangelog"><b>DOGS</b> v${getModVersion()}<br><br>Changes: <ul><li>More messages and tips.</li><li>Show member name when someone connecting remotely.</li></ul></div>`;
    messagesManager.sendLocal(text);
}

const font = document.createElement("link");
font.href = "https://fonts.googleapis.com/css2?family=Comfortaa";
font.rel = "stylesheet";
font.type = "text/css";
document.head.append(font);

const style = document.createElement("style");
style.innerHTML = css;
document.head.append(style);

registerCore({
    name: "DOGS",
    fullName: "Devious Obligate Great Stuff",
    key: "DOGS",
    version: getModVersion(),
    repository: "https://github.com/FurryZoi/Devious-Obligate-Great-Stuff.git",
    fontFamily: "Comfortaa"
});

waitFor(() => typeof window.Player?.MemberNumber === "number").then(() => {
    initStorage();
    loadSettingsMenu();
    loadCommands();
    loadRemoteControl();
    loadDeviousPadlock();
    console.log(`Ready! v${getModVersion()}`);
    toastsManager.success({
        title: `DOGS loaded`,
        message: `v${getModVersion()}`,
        duration: 4000
    });

    if (isVersionNewer(getModVersion(), modStorage.version)) {
        if (modStorage.misc.autoShowChangelog ?? true) {
            if (ServerPlayerIsInChatRoom()) {
                modStorage.version = getModVersion();
                syncStorage();
                chatSendChangelog();
            } else {
                ServerSocket.once("ChatRoomSync", () => {
                    modStorage.version = getModVersion();
                    syncStorage();
                    chatSendChangelog();
                });
            }
        } else {
            modStorage.version = getModVersion();
            syncStorage();
        }
    }
});




