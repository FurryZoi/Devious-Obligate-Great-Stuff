import { registerDecorator, ValidationOptions, ValidationArguments } from "zois-core/validation";

export function ValidateCustom<T extends object>(validator: (object: T) => boolean, validationOptions?: ValidationOptions) {
    return (object: T, propertyName: string) => {
        registerDecorator({
            name: 'validateCustom',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return validator(args.object as T);
                },
                defaultMessage(args: ValidationArguments) {
                    return "Params error";
                }
            },
        });
    };
}
