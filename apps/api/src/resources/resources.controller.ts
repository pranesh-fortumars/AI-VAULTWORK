import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('resources')
@UseGuards(AuthGuard('firebase-jwt'))
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async getResources(@Query('communityId') communityId: string) {
    return this.resourcesService.getResources(communityId || 'default');
  }
}
