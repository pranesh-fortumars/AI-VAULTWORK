import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ChatGateway } from './chat/chat.gateway';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectsModule, TasksModule, UsersModule, RolesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
