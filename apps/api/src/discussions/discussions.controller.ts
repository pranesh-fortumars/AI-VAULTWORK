import { Controller, Get, Post, Body, Query, Request, UseGuards } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('discussions')
@UseGuards(AuthGuard('firebase-jwt'))
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Get()
  async getDiscussions(@Query('communityId') communityId: string) {
    if (!communityId) return [];
    return this.discussionsService.getPostsByCommunity(communityId);
  }

  @Post()
  async createDiscussion(@Body() body: any, @Request() req: any) {
    const { communityId, ...postData } = body;
    return this.discussionsService.createPost(req.user.uid, communityId, postData);
  }
}
