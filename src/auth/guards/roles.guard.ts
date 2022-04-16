import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decoractors/roles.decorator';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if(!roles) {
      return true
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user as PayloadToken;
    const isAuth = roles.some(role => role === user.role);
    if(!isAuth) {
      throw new UnauthorizedException("your role is wrong");
    }
    return isAuth;
  }
}