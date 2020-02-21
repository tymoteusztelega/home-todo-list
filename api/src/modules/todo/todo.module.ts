import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { FirebaseModule } from '../../shared/modules/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
