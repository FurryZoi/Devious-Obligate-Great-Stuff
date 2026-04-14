import { BaseSubscreen } from "zois-core/ui";
import { modStorage, SavedItem } from "@/modules/storage";
import { PutPadlockMinimumRole } from "@/modules/deviousPadlock";
import { toastsManager } from "zois-core/popups";
import { createElement, LockKeyhole } from "lucide";


const putPadlockMinimumRolesNames = {
    [PutPadlockMinimumRole.PUBLIC]: "Public",
    [PutPadlockMinimumRole.FRIEND]: "Friend",
    [PutPadlockMinimumRole.WHITELIST]: "Whitelist",
    [PutPadlockMinimumRole.LOVER]: "Lover",
    [PutPadlockMinimumRole.OWNER]: "Owner"
} as const;

export class DeviousPadlockSubscreen extends BaseSubscreen {
    get name(): string {
        return "Devious Padlock";
    }

    get buttonText(): string {
        return "Devious Padlock";
    }

    get buttonIcon(): SVGElement {
        return createElement(LockKeyhole);
    }

    load(): void {
        super.load?.();
        this.createCheckbox({
            text: "Enabled",
            x: 100,
            y: 300,
            isChecked: !!modStorage.deviousPadlock.state,
            onChange() {
                modStorage.deviousPadlock.state = !modStorage.deviousPadlock.state;
            },
        });

        this.createText({
            text: "Minimum role to put padlock",
            x: 100,
            y: 420,
            width: 600
        }).style.textAlign = "center";

        this.createBackNextButton({
            x: 100,
            y: 485,
            width: 600,
            height: 80,
            currentIndex: Object.values(PutPadlockMinimumRole).slice(Object.values(PutPadlockMinimumRole).length / 2).indexOf(modStorage.deviousPadlock.putMinimumRole ?? PutPadlockMinimumRole.PUBLIC),
            items: Object.values(PutPadlockMinimumRole).slice(Object.values(PutPadlockMinimumRole).length / 2).map((r) => {
                return [putPadlockMinimumRolesNames[r as PutPadlockMinimumRole], r];
            }),
            isBold: true,
            onChange(value) {
                modStorage.deviousPadlock.putMinimumRole = value;
            },
        });

        this.createText({
            text: "The padlock is made in such a way that the wearer cannot remove it on their own. In the padlock settings you can add notes and configure access rights. By default these padlocks are disabled and cannot be used on you, but you can always change it :3",
            x: 900,
            y: 250,
            width: 800,
            withBackground: true,
            padding: 2
        });

        this.createText({
            text: "Tip: The witch from the Magic School can help you to remove padlocks if you do not have a high difficulty mode",
            x: 900,
            y: 700,
            width: 800,
            fontSize: 2.5,
            padding: 2
        });
    }
}