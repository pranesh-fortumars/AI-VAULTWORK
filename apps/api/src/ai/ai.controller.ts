import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ai')
@UseGuards(AuthGuard('firebase-jwt'))
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('ask')
  async askAi(@Body('prompt') prompt: string, @Request() req: any) {
    return this.aiService.askAi(prompt, req.user.uid);
  }
}
