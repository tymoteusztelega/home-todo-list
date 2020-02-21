import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { FirebaseModule } from '../../shared/modules/firebase.module';
import { AuthenticationService } from '../authentication/authentication.service';

@Module({
  imports: [FirebaseModule],
  controllers: [TodoController],
  providers: [TodoService, AuthenticationService],
})
export class TodoModule {}
