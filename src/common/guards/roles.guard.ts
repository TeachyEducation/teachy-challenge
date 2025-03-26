import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user, params } = context.switchToHttp().getRequest();
    const schoolId = params.schoolId;

    if (!schoolId) {
      return false; // ou true, dependendo da sua lógica para rotas sem schoolId
    }

    const userSchools = await this.usersService.findUserSchools(user.userId);
    const userSchool = userSchools.find(us => us.id === schoolId);

    if (!userSchool) {
      return false;
    }

    return requiredRoles.includes(userSchool.role);
  }
}