import slaveryImage from "@/images/slavery.png";
import { guiSubscreensController } from "./guiSubscreensController";

export function loadSettingsMenu(): void {	 
	PreferenceRegisterExtensionSetting({
		Identifier: "DOGS",
		ButtonText: "DOGS Settings",
		Image: slaveryImage,
		click: () => {
			if (MouseIn(1815, 75, 90, 90)) guiSubscreensController.getCurrentSubscreen().name === "Main Menu" ? PreferenceSubscreenExtensionsClear() : guiSubscreensController.getCurrentSubscreen().exit();
			guiSubscreensController.getCurrentSubscreen().click();
		},
		run: () => {
			DrawText(
				`Devious Obligate Great Stuff (DOGS) - ${guiSubscreensController.getCurrentSubscreen().name}`,
				1000,
				125,
				"Black",
				"Gray"
			);
			DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");
			guiSubscreensController.getCurrentSubscreen().run();
		},
		exit: () => {
			guiSubscreensController.getCurrentSubscreen().exit();
		},
		load: () => { 
			guiSubscreensController.getCurrentSubscreen().load();
		},
	});
}