interface Character {
    DOGS?: import("modules/storage").ModStorage
}

interface ItemProperties {
    IsDeviousLock?: boolean
}

interface Window {
    InspectDeviousPadlockBackground: string;
    InspectDeviousPadlockLoad: ScreenLoadHandler;
    InspectDeviousPadlockRun: ScreenRunHandler;
    InspectDeviousPadlockResize: ScreenResizeHandler;
    InspectDeviousPadlockClick: MouseEventListener;
    InventoryItemMiscDeviousPadlockLoad: ScreenLoadHandler
}

declare const IS_DEV: boolean;