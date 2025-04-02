// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Inject } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    const ip = client.handshake.address.replace(/^::ffff:/, '');
    client.emit('your-ip', ip);
    console.log(`Client connected: ${ip}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() text: string,
    @ConnectedSocket() client: Socket,
  ) {
    const ip = client.handshake.address.replace(/^::ffff:/, '');
    const message = {
      user: ip,
      text,
    };

    this.server.emit('message', message);
    await this.chatService.saveMessage(message); // ✅ 存入 MongoDB
  }
}
