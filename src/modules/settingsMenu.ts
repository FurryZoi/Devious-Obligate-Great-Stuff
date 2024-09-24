// function chatSendChangelog() {
// 	const text = "<div style='padding: 3px;'>The BCC addon has been updated, check out the changes using the command <!/bcc help!>!<br><br>Changes: <ul><li>● New command: <!/bcc transform!> to save forms and transform into them</li><li>● Compressed <!Chaos Padlocks!> data</li><li>● Now <!Cosplay Girl Power Stuff!> considered as <!magic wand!> to use dark magic</li><li>● <!Fixed!> bug where the diaper could become wet immediately after launching the mod</li><li>● <!Fixed!> bug that caused the command to be <!incorrectly!> recognized at the beginning of the sentence</li><li>● Now BCC will <!recognize!> the commands of mods: <!EBCH!>, <!MBCHC!>, <!ABCL!>, <!BC-Responsive!></li><li>● <!Fixed!> a bug that caused text to be moved to a new line in the chat input field</li><li>● <!Added!> new outfits</li><li>● <!Added!> new restriction for <!chaos padlocks!></li><li>● <!Added!> diaper wetness indicator</li></ul></div>";
// 	chatSendLocal(text, "left");
// }
import { beautifyMessage, drawCheckbox, drawWrappedText } from "./utils";
import { hookFunction } from "./bcModSdk";
import { modStorage } from "./storage";
import settingsRemoteControlImage from "@/images/settings-remote-control.png";
import settingsDeviousPadlockImage from "@/images/settings-devious-padlock.png";
import slaveryImage from "@/images/slavery.png";


export function loadSettingsMenu(): void {
	let currentSettingsPage = null;
	
	const settingsPages = {
		remoteControl: {
			name: "Remote control",
			icon: () => settingsRemoteControlImage,
			draw: () => {
				const remoteControlPermissionsTexts = {
					0: "Friends and higher",
					1: "Whitelist and higher",
					2: "Lovers and higher"
				};

				DrawText(
					"Devious Overwhelming Gear Script (DOGS) - Remote control",
					1000,
					125,
					"Black",
					"Gray"
				);
				drawCheckbox(150, 300, 65, 65, "Enabled", modStorage.remoteControl.state ? true : false, false, "black", 150, 35);
				DrawText("Who can use remote control on you", 430, 440, "black");
				DrawBackNextButton(
					150, 470, 560, 90, remoteControlPermissionsTexts[modStorage.remoteControl.permission ?? 0],
					"white", "", () => {
						const p = modStorage.remoteControl.permission ?? 0;
						if (p === 0) return remoteControlPermissionsTexts[0];
						return remoteControlPermissionsTexts[p - 1];
					}, () => {
						const p = modStorage.remoteControl.permission ?? 0;
						if (p === 2) return remoteControlPermissionsTexts[2];
						return remoteControlPermissionsTexts[p + 1];
					}
				);

				drawWrappedText(
					`Remote control lets allowed users to remotely change your appearance, now you don't need to be in the same room to change items of your friends. If remote control is disabled then no one can use it on you.`,
					1400, 250, "black", 50
				);
			},
			onClick: () => {
				if (MouseIn(150, 300, 65, 65)) modStorage.remoteControl.state = !modStorage.remoteControl.state;
				if (MouseIn(150, 470, 560 / 2, 90)) {
					modStorage.remoteControl.permission = (
						modStorage.remoteControl.permission === 0 
							? 0
							: (modStorage.remoteControl.permission ?? 0) - 1
					) as 0 | 1 | 2
				}
				if (MouseIn(150 + 560 / 2, 470, 560 / 2, 90)) {
					modStorage.remoteControl.permission = (
						modStorage.remoteControl.permission === 2 
							? 2
							: (modStorage.remoteControl.permission ?? 0) + 1
					) as 0 | 1 | 2
				}
			}
		},
		deviousPadlock: {
			name: "Devious padlock",
			icon: () => settingsDeviousPadlockImage,
			draw: () => {
				DrawText(
					"Devious Overwhelming Gear Script (DOGS) - Devious padlock",
					1000,
					125,
					"Black",
					"Gray"
				);
				drawCheckbox(150, 300, 65, 65, "Enabled", modStorage.deviousPadlock.state, false, "black", 150, 35);
				drawWrappedText(
					`The padlock is made in such a way that the wearer cannot remove it on him own. In the padlock settings you can add notes and configure access rights. By default these padlocks are disabled and cannot be used on you, but you can always change it :3`,
					1400, 250, "black", 50
				);
			},
			onClick: () => {
				if (MouseIn(150, 300, 65, 65)) modStorage.deviousPadlock.state = !modStorage.deviousPadlock.state;
			}
		}
	}

	const settingsButtonLeft = 200;
	const settingsButtonTop = 260;
	const settingsButtonWidth = 600;
	const settingsButtonHeight = 75;
	const settingsButtonsGap = 100;
	 
	PreferenceRegisterExtensionSetting({
		Identifier: "DOGS",
		ButtonText: "DOGS Settings",
		Image: slaveryImage,
		click: () => {
			if (MouseIn(1815, 75, 90, 90)) currentSettingsPage === null ? PreferenceSubscreenExtensionsClear() : currentSettingsPage = null;
			const buttonsPositions = {};
			if (currentSettingsPage === null) {
				Object.keys(settingsPages).forEach((pageKey, i) => {
					buttonsPositions[pageKey] = [settingsButtonLeft, settingsButtonTop + i * settingsButtonsGap, settingsButtonWidth, settingsButtonHeight]
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
				DrawText(
					"Devious Overwhelming Gear Script (DOGS) - General",
					1000,
					125,
					"Black",
					"Gray"
				);
				Object.keys(settingsPages).forEach((pageKey, i) => {
					const page = settingsPages[pageKey];
					// console.log(page.icon)
					DrawButton(
						settingsButtonLeft, settingsButtonTop + i * settingsButtonsGap, settingsButtonWidth,
						settingsButtonHeight, page.name, "White", page.icon()
					);
				});
			} else {
				settingsPages[currentSettingsPage].draw();
			}
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
		},
		exit: () => {

		},
		load: () => {

		},
	});
}