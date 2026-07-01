import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ChatGateway } from './chat/chat.gateway';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { CommunitiesModule } from './communities/communities.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { JobsModule } from './jobs/jobs.module';
import { ResourcesModule } from './resources/resources.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [ProjectsModule, TasksModule, UsersModule, RolesModule, AuthModule, CommunitiesModule, DiscussionsModule, JobsModule, ResourcesModule, AiModule],
  controllers: [AppController],
  providers: [
    AppService, 
    ChatGateway,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    }
  ],
})
export class AppModule {}
