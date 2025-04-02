// src/auth/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: () => `User_${Math.floor(Math.random() * 1000)}` })
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
