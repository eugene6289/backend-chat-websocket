// message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop() user: string;
  @Prop() text: string;
  @Prop({ default: Date.now }) timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
