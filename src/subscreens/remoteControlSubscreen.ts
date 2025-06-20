import { BaseSubscreen } from "zois-core/ui";
import icon from "@/images/settings-remote-control.png";
import { modStorage } from "@/modules/storage";
import { RemoteConnectMinimumRole } from "@/modules/remoteControl";

const remoteConnectMinimumRolesNames = {
    [RemoteConnectMinimumRole.FRIEND]: "Friend",
    [RemoteConnectMinimumRole.WHITELIST]: "Whitelist",
    [RemoteConnectMinimumRole.LOVER]: "Lover",
    [RemoteConnectMinimumRole.OWNER]: "Owner"
};

export class RemoteControlSubscreen extends BaseSubscreen {
    get name(): string {
        return "Remote Control";
    }

    get buttonText(): string {
        return "Remote Control";
    }

    get buttonIcon(): string {
        return icon;
    }

    load(): void {
        super.load();
        this.createCheckbox({
            text: "Enabled",
            x: 100,
            y: 300,
            isChecked: modStorage.remoteControl.state,
            onChange() {
                modStorage.remoteControl.state = !modStorage.remoteControl.state;
            },
        });

        this.createCheckbox({
            text: "Notify others",
            x: 100,
            y: 400,
            isChecked: modStorage.remoteControl.notifyOthers ?? true,
            onChange() {
                modStorage.remoteControl.notifyOthers = !(modStorage.remoteControl.notifyOthers ?? true);
            },
        });

        this.createText({
            text: "Minimum role to connect remotely",
            x: 100,
            y: 520,
            width: 750
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
                    return [remoteConnectMinimumRolesNames[r], r];
                }),
            isBold: true,
            onChange(value) {
                console.log(value);
                modStorage.remoteControl.connectMinimumRole = value
            },
        });

        this.createText({
            text: `Remote control lets allowed users to remotely change your appearance, now you don't need to be in the same room to change items of your friends. If remote control is disabled then no one can use it on you. Type "/dogs remote <member number>" to connect remotely.`,
            x: 925,
            y: 250,
            width: 800,
            withBackground: true,
            padding: 2
        });
    }
}