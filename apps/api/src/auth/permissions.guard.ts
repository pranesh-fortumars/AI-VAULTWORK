import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { UsersService } from '../users/users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredPermissions) {
      return true; // No permissions required
    }
    
    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    // Fetch the full profile from Firestore to get live permissions
    const profile: any = await this.usersService.getProfile(user.uid, user.email);
    
    if (profile.status !== 'Active') {
      return false; // Automatically block non-active users
    }

    // Super Admins have wildcard permissions
    if (profile.permissions?.includes('*')) {
      return true;
    }

    return requiredPermissions.some((permission) => profile.permissions?.includes(permission));
  }
}
