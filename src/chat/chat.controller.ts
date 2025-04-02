// src/chat/chat.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('messages')
  async getMessages(@Query('limit') limit = 50) {
    return this.chatService.getRecentMessages(Number(limit));
  }
}
