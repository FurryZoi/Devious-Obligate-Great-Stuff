import { getModVersion } from "@/index";
import { BaseGuiSubscreen } from "./baseGuiSubscreen";
import { guiSubscreensController } from "@/modules/guiSubscreensController";
import remoteControlImage from "@/images/settings-remote-control.png";
import deviousPadlockImage from "@/images/settings-devious-padlock.png";
import miscImage from "@/images/settings-misc.png";
import slaveryImage from "@/images/slavery.png";
import { RemoteControl } from "./remoteControl";
import { Misc } from "./misc";
import { DeviousPadlock } from "./deviousPadlock";
import { modStorage } from "@/modules/storage";
import { drawWrappedText } from "@/modules/utils";
import { findModByName } from "@/modules/bcModSdk";


interface ISettingButton {
    text: string
    icon: () => string
    subscreen: BaseGuiSubscreen
}

const settingButtons: ISettingButton[] = [
    {
        text: "Remote Control",
        icon: () => remoteControlImage,
        subscreen: new RemoteControl()
    },
    {
        text: "Devious Padlock",
        icon: () => deviousPadlockImage,
        subscreen: new DeviousPadlock()
    },
    {
        text: "Misc",
        icon: () => miscImage,
        subscreen: new Misc()
    }
];

export class MainMenu extends BaseGuiSubscreen {
    readonly settingButtonLeft = 200;
    readonly settingButtonTop = 260;
    readonly settingButtonWidth = 600;
    readonly settingButtonHeight = 85;
    readonly settingButtonsGap = 20;

    readonly releaseBtnDefaultLeft = 1225;
    readonly releaseBtnDefaultTop = 375;
    readonly releaseBtnDefaultWidth = 450;
    readonly releaseBtnDefaultHeight = 100;

    private releaseBtnLeft = this.releaseBtnDefaultLeft;
    private releaseBtnTop = this.releaseBtnDefaultTop;
    private releaseBtnWidth = this.releaseBtnDefaultWidth;
    private releaseBtnHeight = this.releaseBtnDefaultHeight;

    private rectColor = "#CFCFCF";
    private isTouchDevice: boolean;
    private isReleaseButtonClicked = false;

    get name(): string {
        return "Main Menu";
    }

    load(): void {
        this.releaseBtnLeft = this.releaseBtnDefaultLeft;
        this.releaseBtnTop = this.releaseBtnDefaultTop;
        this.isReleaseButtonClicked = false;

        if (findModByName("Themed")) {
            const themedData = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.Themed ?? ""));
            if (
                themedData?.GlobalModule?.themedEnabled && 
                themedData?.GlobalModule?.doVanillaGuiOverhaul && 
                typeof themedData?.ColorsModule?.base?.element === "string"
            ) this.rectColor = themedData.ColorsModule.base.element;
        }

        try {
            document.createEvent("TouchEvent");
            this.isTouchDevice = true;
        } catch (e) {
            this.isTouchDevice = false;
        }
    }

    run(): void {
        DrawButton(1600, 850, 320, 90, `v${getModVersion()}`, "White", slaveryImage, "DOGS Current Version");
        settingButtons.forEach((button, i) => {
            DrawButton(
                this.settingButtonLeft, this.settingButtonTop + i * (this.settingButtonHeight + this.settingButtonsGap), this.settingButtonWidth,
                this.settingButtonHeight, button.text, "White", button.icon()
            );
        }); 

        if (Object.keys(modStorage.deviousPadlock.itemGroups ?? {}).length > 0 && !this.isTouchDevice) {
            DrawRect(1200, 325, 500, 325, this.rectColor);
            DrawButton(
                this.releaseBtnLeft, this.releaseBtnTop, this.releaseBtnWidth, this.releaseBtnHeight,
                this.isReleaseButtonClicked ? "Nice try :3" : "Instant Release", 
                "#EE204D", "Icons/ServiceBell.png",
            );
            drawWrappedText(
                "Instantly remove all devious padlocks from yourself",
                1450, 525, "Red", 30
            );

            if (
                MouseIn(
                    this.releaseBtnLeft - 100, this.releaseBtnTop - 100,
                    this.releaseBtnWidth + 200, this.releaseBtnHeight + 200
                )
            ) {
                let x = 0;
                let y = 0;
                if (MouseX < this.releaseBtnLeft) x = 100 - (this.releaseBtnLeft - MouseX);
                if (MouseX > (this.releaseBtnLeft + this.releaseBtnWidth)) x = (100 - (MouseX - (this.releaseBtnLeft + this.releaseBtnWidth))) * -1;
                if (MouseY < this.releaseBtnTop) y = 100 - (this.releaseBtnTop - MouseY);
                if (MouseY > (this.releaseBtnTop + this.releaseBtnHeight)) y = (100 - (MouseY - (this.releaseBtnTop + this.releaseBtnHeight))) * -1;
                this.releaseBtnLeft += x; 
                this.releaseBtnTop += y;
                if (this.releaseBtnLeft <= 0) this.releaseBtnLeft += (this.releaseBtnWidth + (MouseX - (this.releaseBtnLeft + this.releaseBtnWidth)));
                if ((this.releaseBtnLeft + this.releaseBtnWidth) >= 2000) this.releaseBtnLeft -= ((this.releaseBtnLeft + this.releaseBtnWidth) - MouseX);
                if (this.releaseBtnTop <= 0) this.releaseBtnTop += (this.releaseBtnHeight + (MouseY - (this.releaseBtnTop + this.releaseBtnHeight)));
                if ((this.releaseBtnTop + this.releaseBtnHeight) >= 1000) this.releaseBtnTop -= ((this.releaseBtnTop + this.releaseBtnHeight) - MouseY); 
            }
        }
    }

    click(): void {
        settingButtons.forEach((button, i) => {
            if (
                MouseIn(
                    this.settingButtonLeft, this.settingButtonTop + i * (this.settingButtonHeight + this.settingButtonsGap), 
                    this.settingButtonWidth, this.settingButtonHeight
                )
            ) guiSubscreensController.setSubscreen(button.subscreen);
        });
        if (MouseIn(this.releaseBtnLeft, this.releaseBtnTop, this.releaseBtnWidth, this.releaseBtnHeight)) {
            this.isReleaseButtonClicked = true;
        }
    }
};