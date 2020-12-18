import { createParamDecorator, UnauthorizedException } from '@nestjs/common';


export const CurrentUser: () => ParameterDecorator = createParamDecorator((options, req) => {
    const request = req.switchToHttp().getRequest();
    return request.user;
});