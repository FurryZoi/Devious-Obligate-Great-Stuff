interface Character {
    DOGS?: import("@/modules/storage").ModStorage
}

interface ItemProperties {
    Name?: string
}

interface Window {
    InspectDeviousPadlockBackground: string;
    InspectDeviousPadlockLoad: ScreenLoadHandler;
    InspectDeviousPadlockRun: ScreenRunHandler;
    InspectDeviousPadlockResize: ScreenResizeHandler;
    InspectDeviousPadlockClick: MouseEventListener;
    InventoryItemMiscDeviousPadlockLoad: ScreenLoadHandler
}

declare const ENV_VARS: EnvVars;

interface EnvVars {
    [key: string]: string | undefined;
}