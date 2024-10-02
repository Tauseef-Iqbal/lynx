import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isValidSocialMediaUrl } from 'src/shared/utils';

@ValidatorConstraint({ async: false })
class IsSocialMediaUrlValidConstraint implements ValidatorConstraintInterface {
  validate(url: any, args: ValidationArguments) {
    const [platform] = args.constraints;
    return typeof url === 'string' && isValidSocialMediaUrl(url, platform);
  }

  defaultMessage(args: ValidationArguments) {
    const [platform] = args.constraints;
    return `Invalid URL for ${platform}`;
  }
}

export function IsSocialMediaUrl(platform: string, validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [platform],
      validator: IsSocialMediaUrlValidConstraint,
    });
  };
}
