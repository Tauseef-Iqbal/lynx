import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: false })
export class OneOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const properties = args.constraints;
    return properties.some((propertyName) => object[propertyName] !== undefined && object[propertyName] !== null);
  }

  defaultMessage(args: ValidationArguments) {
    const properties = args.constraints.join(' or ');
    return `At least one of these properties must be provided: ${properties}`;
  }
}

export function OneOf(properties: string[], validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'oneOf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: properties,
      validator: OneOfConstraint,
    });
  };
}
