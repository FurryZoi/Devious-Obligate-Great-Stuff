import { initStorage, modStorage } from "@/modules/storage";
import { loadRemoteControl } from "@/modules/remoteControl";
import { loadSettingsMenu } from "@/modules/settingsMenu";
import { loadCommands } from "@/modules/commands";
import { loadDeviousPadlock } from "@/modules/deviousPadlock";
import { notify } from "@/modules/utils";
import css from "./styles.css";

export function getModVersion(): string {
    return "1.0.0";
}

const font = document.createElement("link");
font.href = "https://fonts.googleapis.com/css2?family=Comfortaa";
font.rel = "stylesheet";
font.type = "text/css";
document.head.append(font);

const style = document.createElement("style");
style.innerHTML = css;
document.head.append(style);

initStorage();
loadSettingsMenu();
loadCommands();
loadRemoteControl();
loadDeviousPadlock();


