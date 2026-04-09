import { BasePadlock, DeviousPadlockUpdateData, KeyHolderMinimumRole } from "@/modules/deviousPadlock";
import { IsArray, isEnum, IsIn, IsNumber, IsOptional, IsString, Matches, registerDecorator, Type, ValidateNested, ValidationArguments, ValidationOptions } from "zois-core/validation";

function ValidateCustom(validator: (object: ValidationArguments["object"]) => boolean, validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'validateCustom',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return validator(args.object);
                },
                defaultMessage(args: ValidationArguments) {
                    return "Params error";
                }
            },
        });
    };
}

class CombinationToLockDto {
    @IsIn(['PIN-Code', 'password'])
    type: "PIN-Code" | "password";

    @IsString()
    @Matches(/^[a-zA-Z0-9!@#$%^&*]+$/, {
        message: 'combination contains invalid characters'
    })
    value: string;
}

export class PadlockConfigDto implements DeviousPadlockUpdateData {
    @IsOptional()
    @ValidateCustom((dto: PadlockConfigDto) => isEnum(dto.baseLock, BasePadlock))
    baseLock?: BasePadlock;

    @IsOptional()
    @ValidateCustom((dto: PadlockConfigDto) => isEnum(dto.minimumRole, KeyHolderMinimumRole))
    minimumRole?: KeyHolderMinimumRole;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    memberNumbers?: number[];

    @IsOptional()
    @IsString()
    note?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    blockedCommands?: string[];

    @IsOptional()
    @IsString()
    @ValidateCustom((obj: PadlockConfigDto) => {
        const date = new Date(obj.unlockTime);
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
    @ValidateCustom((obj: UpdatePadlockMessageDto) => {
        const g = AssetGroupGet("Female3DCG", obj.groupName);
        return !!(g && g.IsItem);
    })
    groupName: AssetGroupItemName;

    @Type(() => PadlockConfigDto)
    @ValidateNested()
    config: PadlockConfigDto;
}