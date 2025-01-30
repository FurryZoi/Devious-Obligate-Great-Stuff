import { getModVersion } from "@/index";
import { BaseGuiSubscreen } from "./baseGuiSubscreen";
import { guiSubscreensController } from "@/modules/guiSubscreensController";
import slaveryImage from "@/images/slavery.png";
import { RemoteControlPermission } from "@/modules/remoteControl";
import { drawCheckbox, drawWrappedText } from "@/modules/utils";
import { modStorage } from "@/modules/storage";
import { DeviousPadlockPutPermission, getNextDeviousPadlockPutPermission, getPreviousDeviousPadlockPutPermission } from "@/modules/deviousPadlock";
import { findModByName } from "@/modules/bcModSdk";


export class Misc extends BaseGuiSubscreen {
    get name(): string {
        return "Misc";
    }

    run(): void {
        drawCheckbox(150, 300, 65, 65, "Delete local messages after delay", modStorage.misc.deleteLocalMessages, false, "black", 360, 35);
		drawCheckbox(150, 400, 65, 65, "Automatically show changelog", modStorage.misc.autoShowChangelog ?? true, false, "black", 340, 35);
    }

    click(): void {
        if (MouseIn(150, 300, 65, 65)) {
            modStorage.misc.deleteLocalMessages = !modStorage.misc.deleteLocalMessages;
        }
        if (MouseIn(150, 400, 65, 65)) {
            modStorage.misc.autoShowChangelog = !(modStorage.misc.autoShowChangelog ?? true);
        }
    }
};