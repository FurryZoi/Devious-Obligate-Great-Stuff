import { BaseSubscreen } from "zois-core/ui";
import { modStorage, SavedItem } from "@/modules/storage";
import { PutPadlockMinimumRole } from "@/modules/deviousPadlock";
import { toastsManager } from "zois-core/toasts";
import { createElement, LockKeyhole } from "lucide";
import { getText } from "zois-core/localization";


const putPadlockMinimumRolesNames = {
    [PutPadlockMinimumRole.PUBLIC]: () => getText("common.minimum_roles.public"),
    [PutPadlockMinimumRole.FRIEND]: () => getText("common.minimum_roles.friend"),
    [PutPadlockMinimumRole.WHITELIST]: () => getText("common.minimum_roles.whitelist"),
    [PutPadlockMinimumRole.LOVER]: () => getText("common.minimum_roles.lover"),
    [PutPadlockMinimumRole.OWNER]: () => getText("common.minimum_roles.owner")
} as const;

export class DeviousPadlockSubscreen extends BaseSubscreen {
    get name(): string {
        return getText("common.devious_padlock");
    }

    get buttonText(): string {
        return getText("common.devious_padlock");
    }

    get buttonIcon(): SVGElement {
        return createElement(LockKeyhole);
    }

    load(): void {
        super.load?.();
        this.createCheckbox({
            text: getText("settings.enabled"),
            x: 100,
            y: 300,
            isChecked: !!modStorage.deviousPadlock.state,
            onChange() {
                modStorage.deviousPadlock.state = !modStorage.deviousPadlock.state;
            },
        });

        this.createText({
            text: getText("settings.devious_padlock.minimum_role_to_put_padlock"),
            x: 100,
            y: 420,
            width: 600,
            height: 50
        }).style.textAlign = "center";

        this.createBackNextButton({
            x: 100,
            y: 485,
            width: 600,
            height: 80,
            currentIndex: Object.values(PutPadlockMinimumRole).slice(Object.values(PutPadlockMinimumRole).length / 2).indexOf(modStorage.deviousPadlock.putMinimumRole ?? PutPadlockMinimumRole.PUBLIC),
            items: Object.values(PutPadlockMinimumRole).slice(Object.values(PutPadlockMinimumRole).length / 2).map((r) => {
                return [putPadlockMinimumRolesNames[r as PutPadlockMinimumRole](), r];
            }),
            onChange(value) {
                modStorage.deviousPadlock.putMinimumRole = value;
            },
        });

        this.createText({
            text: getText("settings.devious_padlock.description"),
            x: 900,
            y: 250,
            width: 800,
            withBackground: true,
            padding: 2
        });

        this.createText({
            text: getText("settings.devious_padlock.escape_tip"),
            x: 900,
            y: 700,
            width: 800,
            fontSize: 2.5,
            padding: 2
        });
    }
}