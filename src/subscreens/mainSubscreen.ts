import { BaseSubscreen } from "zois-core/ui";
import { DeviousPadlockSubscreen } from "./deviousPadlockSubscreen";
import { RemoteControlSubscreen } from "./remoteControlSubscreen";
import { syncStorage } from "@/modules/storage";
import { MiscSubscreen } from "./miscSubscreen";
import { MOD_DATA, version } from "zois-core";

export class MainSubscreen extends BaseSubscreen {
    get name(): string {
        return "Devious Obligate Good Stuff";
    }

    get previousSubscreen(): BaseSubscreen {
        return null;
    }

    load(): void {
        super.load();
        [
            new DeviousPadlockSubscreen(),
            new RemoteControlSubscreen(),
            new MiscSubscreen()
        ].forEach((s, i) => {
            const btn = this.createButton({
                text: s.buttonText,
                x: 120,
                y: 240 + i * 110,
                width: 600,
                padding: 2,
                icon: s.buttonIcon,
            });
            btn.style.fontWeight = "bold";
            btn.addEventListener("click", () => {
                this.setSubscreen(s);
            });
        });

        this.createButton({
            text: `DOGS v${MOD_DATA.version}`,
            anchor: "bottom-right",
            x: 80,
            y: 65,
            width: 240,
            padding: 3
        });

        this.createText({
            text: `ZC v${version}`,
            anchor: "bottom-right",
            x: 210,
            y: 78,
            width: 100,
            fontSize: 2,
            withBackground: true
        }).style.borderRadius = "4px";
    }

    exit(): void {
        super.exit();
        syncStorage();
        PreferenceSubscreenExtensionsClear();
    }
}