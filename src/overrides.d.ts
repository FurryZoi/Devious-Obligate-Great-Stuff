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
    InspectDeviousPadlockClick: MouseEventListener;
}