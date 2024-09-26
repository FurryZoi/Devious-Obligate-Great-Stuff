import { initStorage } from "@/modules/storage";
import { loadRemoteControl } from "@/modules/remoteControl";
import { loadSettingsMenu } from "@/modules/settingsMenu";
import { loadCommands } from "@/modules/commands";
import { loadDeviousPadlock } from "@/modules/deviousPadlock";
import { waitFor } from "@/modules/utils";
import css from "./styles.css";

export function getModVersion(): string {
    return "1.0.1";
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
});



