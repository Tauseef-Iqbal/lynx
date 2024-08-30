import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  if (data && user) {
    const properties = data.split('.');
    let result = user;
    for (const property of properties) {
      result = result ? result[property] : null;
      if (result === null) break;
    }
    return result;
  }

  return user;
});
