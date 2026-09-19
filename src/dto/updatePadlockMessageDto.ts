import { BasePadlock, DeviousPadlockUpdateData, KeyHolderMinimumRole } from "src/modules/deviousPadlock";
import { IsArray, IsBoolean, isEnum, IsIn, IsNumber, IsOptional, IsString, Matches, Type, ValidateNested, } from "zois-core/validation";
import { ValidateWith } from "./decorators";

class CombinationToLockDto {
    @IsIn(["PIN-Code", "password"])
    type!: "PIN-Code" | "password";

    @IsString()
    @Matches(/^[a-zA-Z0-9!@#$%^&*]+$/, {
        message: "combination contains invalid characters"
    })
    value!: string;
}

export class PadlockConfigDto implements DeviousPadlockUpdateData {
    @IsOptional()
    @ValidateWith((dto) => isEnum(dto.baseLock, BasePadlock))
    baseLock?: BasePadlock;

    @IsOptional()
    @ValidateWith((dto) => isEnum(dto.minimumRole, KeyHolderMinimumRole))
    minimumRole?: KeyHolderMinimumRole;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    memberNumbers?: number[];

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsBoolean()
    preventCheatCommands?: boolean;

    @IsOptional()
    @IsString()
    @ValidateWith((obj: PadlockConfigDto) => {
        const date = new Date(obj.unlockTime ?? "");
        return !isNaN(date.getTime());
    }, { message: "unlockTime must be a valid ISO date string" })
    unlockTime?: string;

    @IsOptional()
    @Type(() => CombinationToLockDto)
    @ValidateNested()
    combinationToLock?: CombinationToLockDto

    @IsOptional()
    @IsString()
    combinationToUnlock?: string
}

export class UpdatePadlockMessageDto {
    @IsString()
    @ValidateWith((obj) => {
        const g = AssetGroupGet("Female3DCG", obj.groupName);
        return !!g && g.IsItem();
    })
    groupName!: AssetGroupItemName;

    @Type(() => PadlockConfigDto)
    @ValidateNested()
    config!: PadlockConfigDto;
}