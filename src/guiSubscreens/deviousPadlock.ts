import { getModVersion } from "@/index";
import { BaseGuiSubscreen } from "./baseGuiSubscreen";
import { guiSubscreensController } from "@/modules/guiSubscreensController";
import slaveryImage from "@/images/slavery.png";
import { RemoteControlPermission } from "@/modules/remoteControl";
import { drawCheckbox, drawWrappedText } from "@/modules/utils";
import { modStorage } from "@/modules/storage";
import { DeviousPadlockPutPermission, getNextDeviousPadlockPutPermission, getPreviousDeviousPadlockPutPermission } from "@/modules/deviousPadlock";
import { findModByName } from "@/modules/bcModSdk";
import { EmergencyResetDeviousPadlocks } from "./emergencyResetDeviousPadlocks";
import { MainMenu } from "./mainMenu";


export class DeviousPadlock extends BaseGuiSubscreen {
    get name(): string {
        return "Devious Padlock";
    }

    run(): void {
        const deviousPadlocklPermissionsTexts = {
            [DeviousPadlockPutPermission.FRIENDS_AND_HIGHER]: "Friends and higher",
            [DeviousPadlockPutPermission.WHITELIST_AND_HIGHER]: "Whitelist and higher",
            [DeviousPadlockPutPermission.LOVERS_AND_HIGHER]: "Lovers and higher",
            [DeviousPadlockPutPermission.EVERYONE]: "Everyone"
        };

        drawCheckbox(150, 300, 65, 65, "Enabled", modStorage.deviousPadlock.state, false, "black", 150, 35);
        DrawText("Who can put devious padlock on you", 440, 420, "black");
        DrawBackNextButton(
            150, 450, 580, 90, deviousPadlocklPermissionsTexts[modStorage.deviousPadlock.permission ?? DeviousPadlockPutPermission.FRIENDS_AND_HIGHER],
            "white", "", () => {
                const p = modStorage.deviousPadlock.permission ?? DeviousPadlockPutPermission.EVERYONE;
                return deviousPadlocklPermissionsTexts[getPreviousDeviousPadlockPutPermission(p)]
            }, () => {
                const p = modStorage.deviousPadlock.permission ?? DeviousPadlockPutPermission.EVERYONE;
                return deviousPadlocklPermissionsTexts[getNextDeviousPadlockPutPermission(p)]
            }
        );

        drawWrappedText(
            `The padlock is made in such a way that the wearer cannot remove it on their own. In the padlock settings you can add notes and configure access rights. By default these padlocks are disabled and cannot be used on you, but you can always change it :3`,
            1400, 250, "black", 50
        );
        let color = "#CFCFCF";
        if (findModByName("Themed")) {
            const themedData = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.Themed ?? ""));
            if (
                themedData?.GlobalModule?.themedEnabled && 
                themedData?.GlobalModule?.doVanillaGuiOverhaul && 
                typeof themedData?.ColorsModule?.base?.element === "string"
            ) color = themedData.ColorsModule.base.element;
        }
        DrawRect(1400, 575, 500, 350, color);
        const isResetBtnEnabled = Player.GetDifficulty() === 0;
        DrawButton(
            1425, 625, 450, 100, `Emergency Reset`, 
            isResetBtnEnabled ? "#EE204D" : "Grey", "Icons/ServiceBell.png", 
            isResetBtnEnabled ? "Reset configurations of worn devious padlocks" : 'Unavailable (Requires "Roleplay" difficulty)',
            !isResetBtnEnabled
        );
        drawWrappedText(
            "Reset all configurations of worn devious padlocks including access permission",
            1650, 775, "Red", 30
        );
    }

    click(): void {
        if (MouseIn(150, 300, 65, 65)) modStorage.deviousPadlock.state = !modStorage.deviousPadlock.state;
        const currentPermission = modStorage.deviousPadlock.permission ?? DeviousPadlockPutPermission.EVERYONE; 
        if (MouseIn(150, 450, 580 / 2, 90)) {
            modStorage.deviousPadlock.permission = getPreviousDeviousPadlockPutPermission(currentPermission);
        }
        if (MouseIn(150 + 580 / 2, 450, 580 / 2, 90)) {
            modStorage.deviousPadlock.permission = getNextDeviousPadlockPutPermission(currentPermission);
        }
        if (MouseIn(1425, 625, 450, 100) && Player.GetDifficulty() === 0) {
            guiSubscreensController.setSubscreen(new EmergencyResetDeviousPadlocks());
        }
    }

    exit(): void {
        guiSubscreensController.setSubscreen(new MainMenu());
    }
};