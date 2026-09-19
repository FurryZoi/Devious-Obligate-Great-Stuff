import { DeviousPadlockUpdateData } from "src/modules/deviousPadlock";
import { IsArray, Type, ValidateNested, } from "zois-core/validation";
import { PadlockConfigDto } from "./updatePadlockMessageDto";
import { ValidateWith } from "./decorators";

export class SyncPadlockMessageDto {
    @Type(() => PadlockConfigDto)
    @ValidateNested()
    settings!: DeviousPadlockUpdateData;

    @IsArray()
    @ValidateWith((obj) => {
        return obj.groupNames.every((name) => {
            const g = AssetGroupGet("Female3DCG", name);
            return !!g && g.IsItem();
        });
    })
    groupNames!: AssetGroupItemName[];
}