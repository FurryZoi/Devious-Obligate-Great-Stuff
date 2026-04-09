import { BaseSubscreen } from "zois-core/ui";
import { DeviousPadlockSubscreen } from "./deviousPadlockSubscreen";
import { RemoteControlSubscreen } from "./remoteControlSubscreen";
import { modStorage, syncStorage } from "@/modules/storage";
import { CenterModule, StyleModule, TypeModule } from "zois-core/ui-modules";
import { MainSubscreen } from "./mainSubscreen";
import { dialogsManager } from "zois-core/popups";
import { DeviousPadlockSettingsSubscreen } from "./deviousPadlockSettingsSubscreen";
import { createElement, Save } from "lucide";

export class ProfilesSubscreen extends BaseSubscreen {
    get name(): string {
        return "Profiles";
    }

    get buttonText(): string {
        return "Profiles";
    }

    get buttonIcon(): SVGElement {
        return createElement(Save);
    }

    load(): void {
        super.load?.();

        if (
            !modStorage.deviousPadlock?.profiles ||
            modStorage.deviousPadlock.profiles.length === 0
        ) {
            this.createText({
                text: "No profiles yet.",
                width: 900,
                fontSize: 5,
                modules: {
                    base: [
                        new CenterModule(),
                        new StyleModule({
                            textAlign: "center"
                        })
                    ]
                }
            });
            return;
        }

        const container = this.createScrollView({
            x: 200,
            y: 220,
            width: 600,
            height: 600,
            scroll: "y",
            modules: {
                base: [
                    new StyleModule({
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "0.5em"
                    })
                ]
            }
        });

        modStorage.deviousPadlock?.profiles?.forEach((config) => {
            const row = this.createContainer({
                place: false,
                modules: {
                    base: [
                        new StyleModule({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        })
                    ]
                }
            });
            row.append(
                this.createButton({
                    text: config.name,
                    place: false,
                    width: 500,
                    height: 80,
                    padding: 1,
                    onClick: () => {
                        this.setSubscreen(
                            new DeviousPadlockSettingsSubscreen({
                                mode: "edit-sync-config",
                                syncConfig: config
                            })
                        );
                    }
                }),
                this.createButton({
                    icon: "Icons/Trash.png",
                    place: false,
                    width: 80,
                    height: 80,
                    onClick: async () => {
                        const result = await dialogsManager.confirm({
                            message: "Are you sure you want to delete this config?",
                        });
                        if (result) {
                            modStorage.deviousPadlock.profiles = modStorage.deviousPadlock.profiles?.filter((c) => c.name !== config.name);
                            row.remove();
                            if (modStorage.deviousPadlock.profiles?.length === 0) this.exit();
                        }
                    }
                })
            );
            container.append(row);

        });
    }

    exit(): void {
        super.exit?.();
        this.setSubscreen(new MainSubscreen());
        syncStorage();
    }
}