import { initStorage, modStorage } from "@/modules/storage";
import { loadRemoteControl } from "@/modules/remoteControl";
import { loadSettingsMenu } from "@/modules/settingsMenu";
import { loadCommands } from "@/modules/commands";
import { loadDeviousPadlock } from "@/modules/deviousPadlock";
import { notify } from "@/modules/utils";

export const staticPath = "http://127.0.0.1:5500";
export const modVersion = "1.0.0";

const link1 = document.createElement("link");
link1.href = "https://fonts.googleapis.com/css2?family=Comfortaa";
link1.rel = "stylesheet";
link1.type = "text/css";
document.head.append(link1);

const link2 = document.createElement("link");
link2.href = `${staticPath}/src/styles.css`;
link2.rel = "stylesheet";
link2.type = "text/css";
document.head.append(link2);

initStorage();
loadSettingsMenu();
loadCommands();
loadRemoteControl();
loadDeviousPadlock();


