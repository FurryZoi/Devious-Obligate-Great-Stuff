import "reflect-metadata";
import { initStorage, modStorage, syncStorage } from "@/modules/storage";
import { loadRemoteControl } from "@/modules/remoteControl";
import { loadSettingsMenu } from "@/modules/settingsMenu";
import { loadCommands } from "@/modules/commands";
import { loadDeviousPadlock } from "@/modules/deviousPadlock";
import { registerCore, isVersionNewer, waitForStart, injectStyles } from "zois-core";
import css from "./styles.css";
import { toastsManager } from "zois-core/popups";
import { messagesManager } from "zois-core/messaging";
import { version } from "../package.json";
import { DeviousPadlockSubscreen } from "./subscreens/deviousPadlockSubscreen";
import { MainSubscreen } from "./subscreens/mainSubscreen";
import { MiscSubscreen } from "./subscreens/miscSubscreen";
import { RemoteControlSubscreen } from "./subscreens/remoteControlSubscreen";
import { ProfilesSubscreen } from "./subscreens/profilesSubscreen";
import { GITHUB_REPO_URL } from "./constants";
import { loadDialogs } from "./modules/dialogs";


export function getModVersion(): string {
    return version;
}

export function chatSendChangelog(): void {
    const text = `<div class="dogsChangelog"><b>DOGS</b> v${getModVersion()}<br><br>Changes: <ul><li>[Feature] Allow non-exclusive base padlocks (by leralc)</li><li>[Change] Restore ignored properties on remove (by leralc)</li><li>[Feature] Devious Padlock syncing between each other</li><li>[Change] Technical and UI improvements</li></ul></div>`;
    messagesManager.sendLocal(text);
}

waitForStart(() => {
    registerCore({
        name: "DOGS",
        fullName: "Devious Obligate Great Stuff",
        key: "DOGS",
        version: getModVersion(),
        repository: GITHUB_REPO_URL,
        fontFamily: CommonGetFontName(),
        deepLinkSubscreens: [
            new DeviousPadlockSubscreen(),
            new ProfilesSubscreen(),
            new MainSubscreen(),
            new MiscSubscreen(),
            new RemoteControlSubscreen()
        ]
    });

    injectStyles(css);

    initStorage();
    loadSettingsMenu();
    loadCommands();
    loadDialogs();
    loadRemoteControl();
    loadDeviousPadlock();
    console.log(`DOGS Ready! v${getModVersion()}`);
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




