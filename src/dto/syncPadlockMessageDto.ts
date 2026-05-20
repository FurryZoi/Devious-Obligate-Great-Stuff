import { DeviousPadlockUpdateData } from "@/modules/deviousPadlock";
import { Type, ValidateNested, } from "zois-core/validation";
import { PadlockConfigDto } from "./updatePadlockMessageDto";
import { ValidateCustom } from "./validate";

export class SyncPadlockMessageDto {
    @Type(() => PadlockConfigDto)
    @ValidateNested()
    settings: DeviousPadlockUpdateData = {};

    @ValidateCustom((obj) => {
        return obj.groupNames.every((name) => {
            const g = AssetGroupGet("Female3DCG", name);
            return !!(g && g.IsItem);
        });
    })
    groupNames: AssetGroupItemName[] = [];
}