import { BaseSubscreen } from "zois-core/ui";
import { DeviousPadlockSubscreen } from "./deviousPadlockSubscreen";
import { RemoteControlSubscreen } from "./remoteControlSubscreen";
import { syncStorage } from "@/modules/storage";
import { MOD_DATA, version } from "zois-core";
import { StyleModule, TypeModule } from "zois-core/shard-modules";
import { ProfilesSubscreen } from "./profilesSubscreen";
import { Bug, Code, Code2, createElement, GitPullRequest, PenSquare } from "lucide";
import { GITHUB_REPO_URL } from "@/constants";
import { getText } from "zois-core/localization";
import { showChangelogModal } from "zois-core/changelogs";

export class MainSubscreen extends BaseSubscreen {
    get name(): string {
        return "Devious Obligate Good Stuff";
    }

    load(): void {
        super.load?.();
        [
            new DeviousPadlockSubscreen(),
            new ProfilesSubscreen(),
            new RemoteControlSubscreen()
        ].forEach((s, i) => {
            const btn = this.createButton({
                text: s.buttonText,
                x: 220,
                y: 240 + i * 110,
                width: 700,
                padding: 2,
                height: 90,
                icon: s.buttonIcon,
                modules: {
                    text: [
                        new StyleModule({
                            maxWidth: "75%"
                        })
                    ]
                }
            });
            btn.style.fontWeight = "bold";
            btn.addEventListener("click", () => {
                this.setSubscreen(s);
            });
        });

        this.createCard({
            name: getText("common.version"),
            value: MOD_DATA.version,
            anchor: "bottom-right",
            icon: createElement(GitPullRequest),
            x: 80,
            y: 65,
            width: 220,
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
                text: getText("tooltips.report_bug_or_suggest_feature"),
                position: "left"
            },
            href: GITHUB_REPO_URL + "/issues",
            modules: {
                base: [
                    new StyleModule({
                        zIndex: "10"
                    })
                ]
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
                text: getText("tooltips.view_source_code_on_github"),
                position: "left"
            },
            href: GITHUB_REPO_URL,
            modules: {
                base: [
                    new StyleModule({
                        zIndex: "10"
                    })
                ]
            }
        });

        this.createButton({
            x: 80,
            y: 400,
            width: 90,
            height: 90,
            anchor: "bottom-right",
            icon: createElement(PenSquare),
            variant: "filled",
            tooltip: {
                text: getText("tooltips.view_changelog"),
                position: "left"
            },
            onClick: showChangelogModal
        });
    }

    exit(): void {
        super.exit();
        syncStorage();
        this.setSubscreen(null);
        PreferenceSubscreenExtensionsClear();
    }
}