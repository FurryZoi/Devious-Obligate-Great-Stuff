import { BaseSubscreen } from "zois-core/ui";
import { DeviousPadlockSubscreen } from "./deviousPadlockSubscreen";
import { RemoteControlSubscreen } from "./remoteControlSubscreen";
import { modStorage, syncStorage } from "@/modules/storage";
import { CenterModule, StyleModule, TypeModule } from "zois-core/shard-modules";
import { MainSubscreen } from "./mainSubscreen";
import { dialogsManager } from "zois-core/dialogs";
import { DeviousPadlockSettingsSubscreen } from "./deviousPadlockSettingsSubscreen";
import { createElement, Save } from "lucide";
import { getText } from "zois-core/localization";

export class ProfilesSubscreen extends BaseSubscreen {
    get name(): string {
        return getText("settings.profiles.name");
    }

    get buttonText(): string {
        return getText("settings.profiles.name");
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
                text: getText("settings.profiles.profiles_empty"),
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

        const container = this.createContainer({
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
                parent: container,
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
            this.createButton({
                text: config.name,
                parent: row,
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
            });
            this.createButton({
                icon: "Icons/Trash.png",
                parent: row,
                width: 80,
                height: 80,
                onClick: async () => {
                    const result = await dialogsManager.confirm({
                        message: getText("dialogs.confirm_config_deleting"),
                    });
                    if (result) {
                        modStorage.deviousPadlock.profiles = modStorage.deviousPadlock.profiles?.filter((c) => c.name !== config.name);
                        row.remove();
                        if (modStorage.deviousPadlock.profiles?.length === 0) this.exit();
                    }
                }
            });
        });
    }

    exit(): void {
        super.exit?.();
        this.setSubscreen(new MainSubscreen());
        syncStorage();
    }
}