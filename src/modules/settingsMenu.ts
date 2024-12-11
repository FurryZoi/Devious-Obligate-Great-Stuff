import { drawCheckbox, drawWrappedText } from "./utils";
import { modStorage } from "./storage";
import settingsRemoteControlImage from "@/images/settings-remote-control.png";
import settingsDeviousPadlockImage from "@/images/settings-devious-padlock.png";
import settingsMiscImage from "@/images/settings-misc.png";
import slaveryImage from "@/images/slavery.png";
import { getModVersion } from "@/index";
import { RemoteControlPermission } from "./remoteControl";
import { DeviousPadlockPermission } from "./deviousPadlock";

interface ISettingsPage {
	name: string
	icon: () => string
	draw: () => void
	onClick: () => void
}

type TSettingsPages = Record<string, ISettingsPage>

export function loadSettingsMenu(): void {
	let currentSettingsPage: string | null = null;
	
	const settingsPages: TSettingsPages = {
		remoteControl: {
			name: "Remote control",
			icon: () => settingsRemoteControlImage,
			draw: () => {
				const remoteControlPermissionsTexts = {
					[RemoteControlPermission.FRIENDS_AND_HIGHER]: "Friends and higher",
					[RemoteControlPermission.WHITELIST_AND_HIGHER]: "Whitelist and higher",
					[RemoteControlPermission.LOVERS_AND_HIGHER]: "Lovers and higher"
				};
		
				drawCheckbox(150, 300, 65, 65, "Enabled", modStorage.remoteControl.state, false, "black", 150, 35);
				drawCheckbox(150, 400, 65, 65, "Notify others", modStorage.remoteControl.notifyOthers ?? true, false, "black", 180, 35);
				DrawText("Who can use remote control on you", 430, 520, "black");
				DrawBackNextButton(
					150, 550, 560, 90, remoteControlPermissionsTexts[modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER],
					"white", "", () => {
						const p = modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER;
						if (p === RemoteControlPermission.FRIENDS_AND_HIGHER) return remoteControlPermissionsTexts[p];
						return remoteControlPermissionsTexts[p - 1];
					}, () => {
						const p = modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER;
						if (p === RemoteControlPermission.LOVERS_AND_HIGHER) return remoteControlPermissionsTexts[p];
						return remoteControlPermissionsTexts[p + 1];
					}
				);

				drawWrappedText(
					`Remote control lets allowed users to remotely change your appearance, now you don't need to be in the same room to change items of your friends. If remote control is disabled then no one can use it on you. Type "/dogs remote <member number>" to connect remotely.`,
					1400, 250, "black", 50
				);
			},
			onClick: () => {
				if (MouseIn(150, 300, 65, 65)) modStorage.remoteControl.state = !modStorage.remoteControl.state;
				if (MouseIn(150, 400, 65, 65)) modStorage.remoteControl.notifyOthers = !(modStorage.remoteControl.notifyOthers ?? true);
				if (MouseIn(150, 550, 560 / 2, 90)) {
					const currentPermission = modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER; 
					if (currentPermission > RemoteControlPermission.FRIENDS_AND_HIGHER) {
						modStorage.remoteControl.permission = currentPermission - 1;
					}
				}
				if (MouseIn(150 + 560 / 2, 550, 560 / 2, 90)) {
					const currentPermission = modStorage.remoteControl.permission ?? RemoteControlPermission.FRIENDS_AND_HIGHER; 
					if (currentPermission < RemoteControlPermission.LOVERS_AND_HIGHER) {
						modStorage.remoteControl.permission = currentPermission + 1;
					}
				}
			}
		},
		deviousPadlock: {
			name: "Devious padlock",
			icon: () => settingsDeviousPadlockImage,
			draw: () => {
				const deviousPadlocklPermissionsTexts = {
					[DeviousPadlockPermission.FRIENDS_AND_HIGHER]: "Friends and higher",
					[DeviousPadlockPermission.WHITELIST_AND_HIGHER]: "Whitelist and higher",
					[DeviousPadlockPermission.LOVERS_AND_HIGHER]: "Lovers and higher"
				};

				drawCheckbox(150, 300, 65, 65, "Enabled", modStorage.deviousPadlock.state, false, "black", 150, 35);
				DrawText("Who can put devious padlock on you", 440, 420, "black");
				DrawBackNextButton(
					150, 450, 580, 90, deviousPadlocklPermissionsTexts[modStorage.deviousPadlock.permission ?? DeviousPadlockPermission.FRIENDS_AND_HIGHER],
					"white", "", () => {
						const p = modStorage.deviousPadlock.permission ?? DeviousPadlockPermission.FRIENDS_AND_HIGHER;
						if (p === DeviousPadlockPermission.FRIENDS_AND_HIGHER) return deviousPadlocklPermissionsTexts[p];
						return deviousPadlocklPermissionsTexts[p - 1];
					}, () => {
						const p = modStorage.deviousPadlock.permission ?? 0;
						if (p === DeviousPadlockPermission.LOVERS_AND_HIGHER) return deviousPadlocklPermissionsTexts[p];
						return deviousPadlocklPermissionsTexts[p + 1];
					}
				);

				drawWrappedText(
					`The padlock is made in such a way that the wearer cannot remove it on their own. In the padlock settings you can add notes and configure access rights. By default these padlocks are disabled and cannot be used on you, but you can always change it :3`,
					1400, 250, "black", 50
				);
			},
			onClick: () => {
				if (MouseIn(150, 300, 65, 65)) modStorage.deviousPadlock.state = !modStorage.deviousPadlock.state;
				if (MouseIn(150, 450, 580 / 2, 90)) {
					const currentPermission = modStorage.deviousPadlock.permission ?? DeviousPadlockPermission.FRIENDS_AND_HIGHER; 
					if (currentPermission > DeviousPadlockPermission.FRIENDS_AND_HIGHER) {
						modStorage.deviousPadlock.permission = currentPermission - 1;
					}
				}
				if (MouseIn(150 + 580 / 2, 450, 580 / 2, 90)) {
					const currentPermission = modStorage.deviousPadlock.permission ?? DeviousPadlockPermission.FRIENDS_AND_HIGHER; 
					if (currentPermission < DeviousPadlockPermission.LOVERS_AND_HIGHER) {
						modStorage.deviousPadlock.permission = currentPermission + 1;
					}
				}
			}
		},
		misc: {
			name: "Misc",
			icon: () => settingsMiscImage,
			draw: () => {
				drawCheckbox(150, 300, 65, 65, "Delete local messages after delay", modStorage.misc.deleteLocalMessages, false, "black", 360, 35);
				drawCheckbox(150, 400, 65, 65, "Automatically show changelog", modStorage.misc.autoShowChangelog ?? true, false, "black", 340, 35);
			},
			onClick: () => {
				if (MouseIn(150, 300, 65, 65)) {
					modStorage.misc.deleteLocalMessages = !modStorage.misc.deleteLocalMessages;
				}
				if (MouseIn(150, 400, 65, 65)) {
					modStorage.misc.autoShowChangelog = !(modStorage.misc.autoShowChangelog ?? true);
				}
			},
		}
	}

	const settingsButtonLeft = 200;
	const settingsButtonTop = 260;
	const settingsButtonWidth = 600;
	const settingsButtonHeight = 85;
	const settingsButtonsGap = 20;
	 
	PreferenceRegisterExtensionSetting({
		Identifier: "DOGS",
		ButtonText: "DOGS Settings",
		Image: slaveryImage,
		click: () => {
			if (MouseIn(1815, 75, 90, 90)) currentSettingsPage === null ? PreferenceSubscreenExtensionsClear() : currentSettingsPage = null;
			const buttonsPositions = {};
			if (currentSettingsPage === null) {
				Object.keys(settingsPages).forEach((pageKey, i) => {
					buttonsPositions[pageKey] = [settingsButtonLeft, settingsButtonTop + i * (settingsButtonHeight + settingsButtonsGap), settingsButtonWidth, settingsButtonHeight]
					console.log(buttonsPositions[pageKey]);
				});
				Object.keys(buttonsPositions).forEach((pageKey) => {
					if (MouseIn(...buttonsPositions[pageKey] as RectTuple)) currentSettingsPage = pageKey;
				});
			} else {
				settingsPages[currentSettingsPage].onClick();
			}
		},
		run: () => {
			if (currentSettingsPage === null) {
				DrawButton(1600, 850, 320, 90, `v${getModVersion()}`, "White", slaveryImage, "DOGS Current Version");
				Object.keys(settingsPages).forEach((pageKey, i) => {
					const page = settingsPages[pageKey];
					DrawButton(
						settingsButtonLeft, settingsButtonTop + i * (settingsButtonHeight + settingsButtonsGap), settingsButtonWidth,
						settingsButtonHeight, page.name, "White", page.icon()
					);
				});
			} else {
				settingsPages[currentSettingsPage].draw();
			}
			DrawText(
				`Devious Obligate Great Stuff (DOGS) - ${currentSettingsPage ? settingsPages[currentSettingsPage].name : "General"}`,
				1000,
				125,
				"Black",
				"Gray"
			);
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
		},
		exit: () => {

		},
		load: () => {

		},
	});
}