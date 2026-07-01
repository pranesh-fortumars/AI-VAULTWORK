import { Controller, Get, Post, Param, Request, UseGuards } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('communities')
@UseGuards(AuthGuard('firebase-jwt'))
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  async getAllCommunities() {
    return this.communitiesService.getAllCommunities();
  }

  @Get('my-communities')
  async getMyCommunities(@Request() req: any) {
    return this.communitiesService.getUserCommunities(req.user.uid);
  }

  @Post(':id/join')
  async joinCommunity(@Param('id') id: string, @Request() req: any) {
    return this.communitiesService.joinCommunity(req.user.uid, id);
  }
}
