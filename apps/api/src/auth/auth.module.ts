import { Module } from '@nestjs/common';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { PermissionsGuard } from './permissions.guard';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [FirebaseAuthStrategy, PermissionsGuard],
  exports: [PermissionsGuard],
})
export class AuthModule {}
