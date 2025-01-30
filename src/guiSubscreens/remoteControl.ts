import { getModVersion } from "@/index";
import { BaseGuiSubscreen } from "./baseGuiSubscreen";
import { guiSubscreensController } from "@/modules/guiSubscreensController";
import slaveryImage from "@/images/slavery.png";
import { RemoteControlPermission } from "@/modules/remoteControl";
import { drawCheckbox, drawWrappedText } from "@/modules/utils";
import { modStorage } from "@/modules/storage";


export class RemoteControl extends BaseGuiSubscreen {
    get name(): string {
        return "Remote Control";
    }

    run(): void {
        const remoteControlPermissionsTexts = {
            [RemoteControlPermission.FRIENDS_AND_HIGHER]: "Friends and higher",
            [RemoteControlPermission.WHITELIST_AND_HIGHER]: "Whitelist and higher",
            [RemoteControlPermission.LOVERS_AND_HIGHER]: "Lovers and higher"
        };

        drawCheckbox(150, 300, 65, 65, "Enabled", modStorage.remoteControl.state, false, "black", 150, 35);
        drawCheckbox(150, 400, 65, 65, "Notify others", modStorage.remoteControl.notifyOthers ?? true, false, "black", 180, 35);
        DrawText("Who can use remote control on you", 430, 520, "black");
        DrawBackNextButton(
            150, 550, 560, 90, remoteControlPermissionsTexts[modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER],
            "white", "", () => {
                const p = modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER;
                if (p === RemoteControlPermission.FRIENDS_AND_HIGHER) return remoteControlPermissionsTexts[p];
                return remoteControlPermissionsTexts[p - 1];
            }, () => {
                const p = modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER;
                if (p === RemoteControlPermission.LOVERS_AND_HIGHER) return remoteControlPermissionsTexts[p];
                return remoteControlPermissionsTexts[p + 1];
            }
        );

        drawWrappedText(
            `Remote control lets allowed users to remotely change your appearance, now you don't need to be in the same room to change items of your friends. If remote control is disabled then no one can use it on you. Type "/dogs remote <member number>" to connect remotely.`,
            1400, 250, "black", 50
        );
    }

    click(): void {
        if (MouseIn(150, 300, 65, 65)) modStorage.remoteControl.state = !modStorage.remoteControl.state;
        if (MouseIn(150, 400, 65, 65)) modStorage.remoteControl.notifyOthers = !(modStorage.remoteControl.notifyOthers ?? true);
        if (MouseIn(150, 550, 560 / 2, 90)) {
            const currentPermission = modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER; 
            if (currentPermission > RemoteControlPermission.FRIENDS_AND_HIGHER) {
                modStorage.remoteControl.permission = currentPermission - 1;
            }
        }
        if (MouseIn(150 + 560 / 2, 550, 560 / 2, 90)) {
            const currentPermission = modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER; 
            if (currentPermission < RemoteControlPermission.LOVERS_AND_HIGHER) {
                modStorage.remoteControl.permission = currentPermission + 1;
            }
        }
    }
};