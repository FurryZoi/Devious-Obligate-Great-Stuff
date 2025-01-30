import { BaseGuiSubscreen } from "@/guiSubscreens/baseGuiSubscreen";
import { MainMenu } from "@/guiSubscreens/mainMenu";

class GuiSubscreensController {
    private currentSubscreen: BaseGuiSubscreen = new MainMenu();
    private previousSubscreen: BaseGuiSubscreen | null = null;
    
    getCurrentSubscreen() {
        return this.currentSubscreen;
    }

    setSubscreen(subscreen: BaseGuiSubscreen): void {
        if (this.currentSubscreen.name === subscreen.name) return;
        this.previousSubscreen = this.currentSubscreen;
        this.currentSubscreen = subscreen;
        subscreen.load();
    }

    setPreviousSubscreen(): void {
        if (!this.previousSubscreen) return;
        this.setSubscreen(this.previousSubscreen);
    }
};

export const guiSubscreensController = new GuiSubscreensController();