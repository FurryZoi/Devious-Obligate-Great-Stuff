import { BaseSubscreen } from "zois-core/ui";
import { modStorage } from "@/modules/storage";
import { RemoteConnectMinimumRole } from "@/modules/remoteControl";
import { createElement, Radio } from "lucide";
import { getText } from "zois-core/localization";

const remoteConnectMinimumRolesNames = {
    [RemoteConnectMinimumRole.FRIEND]: () => getText("common.minimum_roles.friend"),
    [RemoteConnectMinimumRole.WHITELIST]: () => getText("common.minimum_roles.whitelist"),
    [RemoteConnectMinimumRole.LOVER]: () => getText("common.minimum_roles.lover"),
    [RemoteConnectMinimumRole.OWNER]: () => getText("common.minimum_roles.owner")
};

export class RemoteControlSubscreen extends BaseSubscreen {
    get name(): string {
        return getText("settings.remote_control.name");
    }

    get buttonText(): string {
        return getText("settings.remote_control.name");
    }

    get buttonIcon(): SVGElement {
        return createElement(Radio);
    }

    load(): void {
        super.load?.();
        this.createCheckbox({
            text: getText("settings.enabled"),
            x: 100,
            y: 300,
            isChecked: !!modStorage.remoteControl.state,
            onChange() {
                modStorage.remoteControl.state = !modStorage.remoteControl.state;
            },
        });

        this.createCheckbox({
            text: getText("settings.remote_control.notify_others"),
            x: 100,
            y: 400,
            isChecked: modStorage.remoteControl.notifyOthers ?? true,
            onChange() {
                modStorage.remoteControl.notifyOthers = !(modStorage.remoteControl.notifyOthers ?? true);
            },
        });

        this.createText({
            text: getText("settings.remote_control.minimum_role_to_connect_remotely"),
            x: 100,
            y: 520,
            width: 750,
            height: 50
        }).style.textAlign = "center";

        this.createBackNextButton({
            x: 100,
            y: 585,
            width: 750,
            height: 80,
            currentIndex: modStorage.remoteControl.connectMinimumRole ?? RemoteConnectMinimumRole.FRIEND,
            items: Object.values(RemoteConnectMinimumRole)
                .slice(Object.values(RemoteConnectMinimumRole).length / 2)
                .map((r) => {
                    return [remoteConnectMinimumRolesNames[r as RemoteConnectMinimumRole](), r];
                }),
            onChange(value) {
                modStorage.remoteControl.connectMinimumRole = value
            },
        });

        this.createText({
            text: getText("settings.remote_control.description"),
            x: 925,
            y: 250,
            width: 800,
            withBackground: true,
            padding: 2
        });
    }
}