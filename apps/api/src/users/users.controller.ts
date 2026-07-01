import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('firebase-jwt'))
  @Get('me')
  async getMe(@Request() req: any) {
    // req.user contains the decoded Firebase JWT from FirebaseAuthStrategy
    return this.usersService.getProfile(req.user.uid, req.user.email);
  }

  @Post('bootstrap-admin')
  async bootstrapAdmin(@Body('email') email: string) {
    // NOTE: In production, this should be secured by an API key or removed entirely.
    return this.usersService.upgradeToSuperAdmin(email);
  }
}
