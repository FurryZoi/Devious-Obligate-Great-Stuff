import { IsString } from "zois-core/validation";
import { ValidateWith } from "./decorators";

export class RemovePadlockMessageDto {
    @IsString()
    combination!: string;

    @IsString()
    @ValidateWith((obj) => {
        const g = AssetGroupGet("Female3DCG", obj.groupName);
        return !!g && g.IsItem();
    })
    groupName!: AssetGroupItemName;
}