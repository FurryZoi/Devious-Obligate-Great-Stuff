import { BaseSubscreen } from "zois-core/ui";
import { modStorage } from "@/modules/storage";
import { createElement, Settings2 } from "lucide";


export class MiscSubscreen extends BaseSubscreen {
    get name(): string {
        return "Misc";
    }

    get buttonText(): string {
        return "Misc";
    }

    get buttonIcon(): SVGElement {
        return createElement(Settings2);
    }

    load(): void {
        super.load?.();
        this.createCheckbox({
            text: "Automatically show changelog",
            x: 100,
            y: 300,
            isChecked: modStorage.misc.autoShowChangelog ?? true,
            onChange() {
                modStorage.misc.autoShowChangelog = !(modStorage.misc.autoShowChangelog ?? true)
            },
        });
    }
}