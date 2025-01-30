import { guiSubscreensController } from "@/modules/guiSubscreensController";

export abstract class BaseGuiSubscreen {
    get name(): string {
        return "";
    }

    run() {}
    load?() {}
    click?() {}
    exit?() {
        guiSubscreensController.setPreviousSubscreen();
    }
}