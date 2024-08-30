import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function ConditionalDiscardValue(field: string, condition: (value: any) => boolean, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'ConditionalDiscardValue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [field, condition],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName, conditionFn] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (!conditionFn(relatedValue)) {
            if (value !== undefined && value !== null && value !== '') {
              return false;
            }
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${args.property} is invalid because ${relatedPropertyName} did not meet the condition.`;
        },
      },
      async: false,
    });
  };
}
