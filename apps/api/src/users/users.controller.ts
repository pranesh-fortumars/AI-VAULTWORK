import { Controller, Get, Post, Body, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get('me')
  async getMe(@Request() req: any) {
    return this.usersService.getProfile(req.user.uid, req.user.email);
  }

  @Post('bootstrap-admin')
  async bootstrapAdmin(@Body('email') email: string) {
    return this.usersService.upgradeToSuperAdmin(email);
  }

  @UseGuards(AuthGuard('firebase-jwt'), PermissionsGuard)
  @Permissions('users:manage')
  @Get('pending')
  async getPendingUsers() {
    return this.usersService.getPendingUsers();
  }

  @UseGuards(AuthGuard('firebase-jwt'), PermissionsGuard)
  @Permissions('users:manage')
  @Patch(':id/approve')
  async approveUser(
    @Param('id') id: string,
    @Body() approvalData: { roleId: string; department: string; permissions: string[] }
  ) {
    return this.usersService.approveUser(id, approvalData);
  }

  @UseGuards(AuthGuard('firebase-jwt'), PermissionsGuard)
  @Permissions('users:manage')
  @Patch(':id/suspend')
  async suspendUser(@Param('id') id: string) {
    return this.usersService.suspendUser(id);
  }
}
