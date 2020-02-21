import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../shared/services/firebase.service';
import ITodo from './todo.interface';

@Injectable()
export class TodoService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getTodos(): Promise<ITodo[]> {
    const todoRef = this.firebaseService.database.ref('/todos');
    const todoSnapshot = await todoRef.once('value');
    return todoSnapshot.val() as ITodo[];
  }
}
