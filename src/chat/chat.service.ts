// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './message.schema'; // ✅ 引入 schema
import { Model } from 'mongoose'; // ✅ 引入 Mongoose 的 Model

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Message.name) private msgModel: Model<MessageDocument>,
  ) {}

  async saveMessage(data: { user: string; text: string }) {
    const newMessage = new this.msgModel(data);
    return newMessage.save();
  }

  async getRecentMessages(limit = 50) {
    return this.msgModel.find().sort({ timestamp: 1 }).limit(limit).exec();
  }
}
