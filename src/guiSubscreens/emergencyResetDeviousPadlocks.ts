import { drawWrappedText, notify } from "@/modules/utils";
import { BaseGuiSubscreen } from "./baseGuiSubscreen";
import { modStorage, TSavedItem } from "@/modules/storage";


export class EmergencyResetDeviousPadlocks extends BaseGuiSubscreen {
    private enableButtonTime: number;

    get name(): string {
        return "Emergency Reset Devious Padlocks";
    }

    run(): void {
        const text = ((this.enableButtonTime - Date.now()) / 1000) > 0 ? `(${Math.round((this.enableButtonTime - Date.now()) / 1000)}) Confirm` : "Confirm";
        drawWrappedText(
            "This operation will reset all the configuration settings of the devious padlocks so that anyone except you will be able to change configurations or remove padlock.",
            1000, 400, "black", 100 
        );
        DrawButton(750, 800, 450, 80, text, "white", null, "Emergency Reset Devious Padlocks", this.enableButtonTime > Date.now());
    }

    load(): void {
        this.enableButtonTime = Date.now() + 10_000;
    }

    click(): void {
        if (MouseIn(750, 800, 450, 80) && Date.now() > this.enableButtonTime) {
            Object.keys(modStorage.deviousPadlock.itemGroups).forEach((k) => {
                modStorage.deviousPadlock.itemGroups[k as AssetGroupItemName] = Object.fromEntries(
                    ["owner", "item"].map((n) => [ n, modStorage.deviousPadlock.itemGroups[k as AssetGroupItemName][n] ])
                ) as {
                    item: TSavedItem
                    owner: number
                };
            });
            this.exit();
            notify("Devious padlocks configurations have been successfully reset", 4500);
        }
    }
};