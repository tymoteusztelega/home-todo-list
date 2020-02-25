import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import cors from 'cors';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TodoModule } from './modules/todo/todo.module';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AuthenticationMiddleware } from './shared/middlewares/authentication.middleware';

@Module({
  imports: [AuthenticationModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthenticationMiddleware).forRoutes('/api/todos');
  }
}
