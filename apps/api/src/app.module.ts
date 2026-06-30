import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [ProjectsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
