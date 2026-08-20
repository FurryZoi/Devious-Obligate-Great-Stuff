import "reflect-metadata";
import { initStorage, modStorage, syncStorage } from "@/modules/storage";
import { loadRemoteControl } from "@/modules/remoteControl";
import { loadSettingsMenu } from "@/modules/settingsMenu";
import { loadCommands } from "@/modules/commands";
import { loadDeviousPadlock } from "@/modules/deviousPadlock";
import { isVersionNewer, bootstrap, ModData, waitFor, MOD_DATA } from "zois-core";
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
import { getText } from "zois-core/localization";
import changelog from "../changelog.json";
import { showChangelogModal } from "zois-core/changelogs";


export function chatSendChangelog(): void {
    const text = `<div class="dogsChangelog"><b>DOGS</b> v${MOD_DATA.version}<br><br>Changes: <ul><li>[Change] Replaced "blocked commands" textarea with "prevent cheat commands" checkbox</li><li>[Fix] Fixed a bug with base lock change was not applied due to incorrect validation</li></ul></div>`;
    messagesManager.sendLocal(text);
}

let hasInitialized = false;

bootstrap({
    name: "DOGS",
    fullName: "Devious Obligate Great Stuff",
    key: "DOGS",
    version,
    repository: GITHUB_REPO_URL,
    fontFamily: CommonGetFontName(),
    subscreens: {
        DeviousPadlockSubscreen,
        ProfilesSubscreen,
        MainSubscreen,
        RemoteControlSubscreen
    },
    localization: {
        locales: {
            default: "en",
            supported: ["en", "ru"]
        },
        translationsFolderPath: ENV_VARS.IS_DEV === "true" ? `http://localhost:8000/localization` : "https://furryzoi.github.io/Devious-Obligate-Great-Stuff/localization"
    },
    changelog: {
        data: changelog as NonNullable<ModData["changelog"]>["data"]
    },
    onReady: initializeDOGS
});

function initializeDOGS(): void {
    if (hasInitialized) return;
    hasInitialized = true;

    initStorage();
    loadSettingsMenu();
    loadCommands();
    loadDialogs();
    loadRemoteControl();
    void loadDeviousPadlock();
    logger.log(`Ready! v${version}`);
    toastsManager.success({
        title: getText(`toasts.mod_loaded`, { name: "DOGS" }),
        message: `v${version}`,
        duration: 4000
    });

    if (isVersionNewer(MOD_DATA.version, modStorage.version)) {
        waitFor(() => !!document.getElementById("InputChat")).then(() => {
            modStorage.version = version;
            syncStorage();
            const text = document.createElement("p");
            text.textContent = "DOGS was updated, click here to read changelog"
            text.onclick = showChangelogModal;
            messagesManager.sendLocal(text);
        });
    }
}




