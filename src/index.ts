import { initStorage, modStorage } from "@/modules/storage";
import { loadRemoteControl } from "@/modules/remoteControl";
import { loadSettingsMenu } from "@/modules/settingsMenu";
import { loadCommands } from "@/modules/commands";
import { loadDeviousPadlock } from "@/modules/deviousPadlock";
import { chatSendChangelog, consoleLog, isVersionNewer, waitFor } from "@/modules/utils";
import css from "./styles.css";

export function getModVersion(): string {
    return "1.0.9";
}

const font = document.createElement("link");
font.href = "https://fonts.googleapis.com/css2?family=Comfortaa";
font.rel = "stylesheet";
font.type = "text/css";
document.head.append(font);

const style = document.createElement("style");
style.innerHTML = css;
document.head.append(style);

waitFor(() => typeof window.Player?.MemberNumber === "number").then(() => {
    initStorage();
    loadSettingsMenu();
    loadCommands();
    loadRemoteControl();
    loadDeviousPadlock();
    consoleLog(`Ready! v${getModVersion()}`);

    if (isVersionNewer(getModVersion(), modStorage.version)) {
        if (modStorage.misc.autoShowChangelog ?? true) {
            if (ServerPlayerIsInChatRoom()) {
                modStorage.version = getModVersion();
                chatSendChangelog();
            } else {
                ServerSocket.once("ChatRoomSync", () => {
                    modStorage.version = getModVersion();
                    chatSendChangelog();
                });
            }
        } else modStorage.version = getModVersion();
    }
});



