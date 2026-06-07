import { BasePadlock, DeviousPadlockUpdateData, KeyHolderMinimumRole } from "@/modules/deviousPadlock";
import { IsArray, IsBoolean, isEnum, IsIn, IsNumber, IsOptional, IsString, Matches, Type, ValidateNested, } from "zois-core/validation";
import { ValidateCustom } from "./validate";

class CombinationToLockDto {
    @IsIn(['PIN-Code', 'password'])
    // @ts-expect-error
    type: "PIN-Code" | "password";

    @IsString()
    @Matches(/^[a-zA-Z0-9!@#$%^&*]+$/, {
        message: 'combination contains invalid characters'
    })
    // @ts-expect-error
    value: string;
}

export class PadlockConfigDto implements DeviousPadlockUpdateData {
    @IsOptional()
    @ValidateCustom((dto) => isEnum(dto.baseLock, BasePadlock))
    baseLock?: BasePadlock;

    @IsOptional()
    @ValidateCustom((dto) => isEnum(dto.minimumRole, KeyHolderMinimumRole))
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
    @ValidateCustom((obj: PadlockConfigDto) => {
        const date = new Date(obj.unlockTime ?? "");
        return !isNaN(date.getTime());
    }, { message: "unlockTime must be a valid ISO date string" })
    unlockTime?: string;

    @IsOptional()
    @Type(() => CombinationToLockDto)
    @ValidateNested()
    // @ts-expect-error
    combinationToLock: CombinationToLockDto

    @IsOptional()
    @IsString()
    combinationToUnlock?: string
}

export class UpdatePadlockMessageDto {
    @IsString()
    @ValidateCustom((obj) => {
        const g = AssetGroupGet("Female3DCG", obj.groupName);
        return !!(g && g.IsItem);
    })
    // @ts-expect-error
    groupName: AssetGroupItemName;

    @Type(() => PadlockConfigDto)
    @ValidateNested()
    // @ts-expect-error
    config: PadlockConfigDto;
}