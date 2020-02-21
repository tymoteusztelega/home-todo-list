import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import moment from 'moment';
import { FirebaseService } from '../../shared/services/firebase.service';
import ITodo from './todo.interface';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class TodoService {
  private _todoRef: firebase.database.Reference;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly authenticationService: AuthenticationService,
  ) {
    this._todoRef = this.firebaseService.database.ref('/todos');
  }

  async getTodos(): Promise<ITodo[]> {
    const todoSnapshot = await this._todoRef.once('value');
    const todosAsArray: ITodo[] = Object.entries(todoSnapshot.val()).map(
      ([id, todo]: [string, ITodo]) => ({
        ...todo,
        id,
      }),
    );
    return todosAsArray;
  }

  createTodo(todo: Partial<ITodo>): firebase.database.ThenableReference {
    const user = this.authenticationService.getCurrentUser();

    const {
      providerData: [data],
      email,
    } = user;

    const newTodo = {
      ...todo,
      isDone: false,
      creationDate: moment().format(),
      createdBy: data.displayName || email,
    } as ITodo;
    Logger.log(newTodo);
    return this._todoRef.push(newTodo);
  }

  updateTodo(id: string, todo: Partial<ITodo>): Promise<void> {
    return this._todoRef.child(id).update(todo);
  }

  deleteTodo(id: string): Promise<void> {
    return this._todoRef.child(id).remove();
  }
}
