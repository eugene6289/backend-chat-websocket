// src/auth/auth.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(dto: RegisterDto) {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new ConflictException('Email already exists');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      email: dto.email,
      passwordHash: hash,
    });

    await user.save();
    return {
      message: '註冊成功',
      email: user.email,
      nickname: user.nickname,
    };
  }
}
