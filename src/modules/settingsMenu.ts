import slaveryImage from "@/images/slavery.png";
import { MainSubscreen } from "@/subscreens/mainSubscreen";
import { BaseSubscreen, getCurrentSubscreen, setSubscreen } from "zois-core/ui";


export function loadSettingsMenu(): void {
	PreferenceRegisterExtensionSetting({
		Identifier: "DOGS",
		ButtonText: "DOGS Settings",
		Image: slaveryImage,
		click: () => {
			getCurrentSubscreen()?.click();
		},
		run: () => {
			getCurrentSubscreen()?.run();
		},
		exit: () => false,
		load: () => {
			setSubscreen(new MainSubscreen());
		}
	});
}