import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'ConditionalValue', async: false })
export class ConditionalValidationConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName, conditionFn] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];

    if (conditionFn(relatedValue)) {
      return true;
    }

    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        return value.length === 0;
      } else if (typeof value === 'string') {
        return value.trim().length === 0;
      } else if (value === null || value === undefined) {
        return true;
      } else if (typeof value === 'number') {
        return false;
      } else if (typeof value === 'boolean') {
        return false;
      } else {
        return false;
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const [relatedPropertyName] = args.constraints;
    return `${args.property} should not be provided when ${relatedPropertyName} does not meet the required condition.`;
  }
}

export function ConditionalValue(field: string, condition: (value: any) => boolean, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [field, condition],
      validator: ConditionalValidationConstraint,
    });
  };
}
