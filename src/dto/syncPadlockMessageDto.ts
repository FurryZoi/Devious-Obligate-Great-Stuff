import { DeviousPadlockUpdateData } from "@/modules/deviousPadlock";
import { registerDecorator, Type, ValidateNested, ValidationArguments, ValidationOptions } from "zois-core/validation";
import { PadlockConfigDto } from "./updatePadlockMessageDto";

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

export class SyncPadlockMessageDto {
    @Type(() => PadlockConfigDto)
    @ValidateNested()
    settings: DeviousPadlockUpdateData;

    @ValidateCustom((obj: SyncPadlockMessageDto) => {
        return obj.groupNames.every((name) => {
            const g = AssetGroupGet("Female3DCG", name);
            return !!(g && g.IsItem);
        });
    })
    groupNames: AssetGroupItemName[];
}