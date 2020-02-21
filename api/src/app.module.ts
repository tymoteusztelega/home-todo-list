import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TodoModule } from './modules/todo/todo.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import { AuthenticationMiddleware } from './shared/middlewares/authentication.middleware';

@Module({
  imports: [AuthenticationModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(AuthenticationMiddleware).forRoutes('/api/todos');
  }
}
