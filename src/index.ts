import "reflect-metadata";
import { initStorage, modStorage, syncStorage } from "@/modules/storage";
import { loadRemoteControl } from "@/modules/remoteControl";
import { loadSettingsMenu } from "@/modules/settingsMenu";
import { loadCommands } from "@/modules/commands";
import { loadDeviousPadlock } from "@/modules/deviousPadlock";
import { isVersionNewer, bootstrap, injectStyles } from "zois-core";
import css from "./styles.css";
import { toastsManager } from "zois-core/toasts";
import { messagesManager } from "zois-core/messaging";
import { version } from "../package.json";
import { DeviousPadlockSubscreen } from "./subscreens/deviousPadlockSubscreen";
import { MainSubscreen } from "./subscreens/mainSubscreen";
import { RemoteControlSubscreen } from "./subscreens/remoteControlSubscreen";
import { ProfilesSubscreen } from "./subscreens/profilesSubscreen";
import { GITHUB_REPO_URL } from "./constants";
import { loadDialogs } from "./modules/dialogs";
import { logger } from "zois-core/logging";


export function getModVersion(): string {
    return version;
}

export function chatSendChangelog(): void {
    const text = `<div class="dogsChangelog"><b>DOGS</b> v${getModVersion()}<br><br>Changes: <ul><li>[Change] Replaced "blocked commands" textarea with "prevent cheat commands" checkbox</li><li>[Fix] Fixed a bug with base lock change was not applied due to incorrect validation</li></ul></div>`;
    messagesManager.sendLocal(text);
}

let hasInitialized = false;

bootstrap({
    name: "DOGS",
    fullName: "Devious Obligate Great Stuff",
    key: "DOGS",
    version: getModVersion(),
    repository: GITHUB_REPO_URL,
    fontFamily: CommonGetFontName(),
    subscreens: {
        DeviousPadlockSubscreen,
        ProfilesSubscreen,
        MainSubscreen,
        RemoteControlSubscreen
    },
    onReady: initializeDOGS
});

function initializeDOGS(): void {
    if (hasInitialized) return;
    hasInitialized = true;


    injectStyles(css);

    initStorage();
    loadSettingsMenu();
    loadCommands();
    loadDialogs();
    loadRemoteControl();
    void loadDeviousPadlock();
    logger.log(`Ready! v${getModVersion()}`);
    toastsManager.success({
        title: `DOGS loaded`,
        message: `v${getModVersion()}`,
        duration: 4000
    });

    if (isVersionNewer(getModVersion(), modStorage.version)) {
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
    }
}




