import { Logger, Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/logger.middleware';

@Module({
  imports: [
    PostModule,
    MongooseModule.forRoot('mongodb://admin:admin123@localhost:27017/chatdb', {
      authSource: 'admin',
    }),
    ChatModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // 全部路由都 log
  }
}
