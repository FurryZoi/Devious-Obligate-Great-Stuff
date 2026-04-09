import { BaseSubscreen } from "zois-core/ui";
import { DeviousPadlockSubscreen } from "./deviousPadlockSubscreen";
import { RemoteControlSubscreen } from "./remoteControlSubscreen";
import { syncStorage } from "@/modules/storage";
import { MiscSubscreen } from "./miscSubscreen";
import { MOD_DATA, version } from "zois-core";
import { TypeModule } from "zois-core/ui-modules";
import { ProfilesSubscreen } from "./profilesSubscreen";
import { Bug, Code, Code2, createElement, GitPullRequest } from "lucide";
import { GITHUB_REPO_URL } from "@/constants";

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
            new ProfilesSubscreen(),
            new RemoteControlSubscreen(),
            new MiscSubscreen()
        ].forEach((s, i) => {
            const btn = this.createButton({
                text: s.buttonText,
                x: 220,
                y: 240 + i * 110,
                width: 700,
                padding: 2,
                icon: s.buttonIcon,
            });
            btn.style.fontWeight = "bold";
            btn.addEventListener("click", () => {
                this.setSubscreen(s);
            });
        });

        this.createCard({
            name: `Version`,
            value: MOD_DATA.version,
            anchor: "bottom-right",
            icon: createElement(GitPullRequest),
            x: 80,
            y: 65,
            modules: {
                value: [
                    new TypeModule({ duration: 850 })
                ]
            }
        });

        this.createButton({
            x: 80,
            y: 200,
            width: 90,
            height: 90,
            anchor: "bottom-right",
            icon: createElement(Bug),
            tooltip: {
                text: "Report a bug or suggest a feature",
                position: "left"
            },
            onClick: () => {
                window.open(GITHUB_REPO_URL + "/issues", "_blank");
            }
        });

        this.createButton({
            x: 80,
            y: 300,
            width: 90,
            height: 90,
            anchor: "bottom-right",
            icon: createElement(Code2),
            tooltip: {
                text: "View source code on GitHub",
                position: "left"
            },
            onClick: () => {
                window.open(GITHUB_REPO_URL, "_blank");
            }
        });
    }

    exit(): void {
        super.exit();
        syncStorage();
        PreferenceSubscreenExtensionsClear();
    }
}