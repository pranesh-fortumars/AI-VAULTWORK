import { Controller, Get, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('jobs')
@UseGuards(AuthGuard('firebase-jwt'))
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async getJobs() {
    return this.jobsService.getJobs();
  }
}
