import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todos } from './todos.reducer';
import { todosQuery } from './todos.selectors';
import { fetchTodosRequest, createTodoRequest, setTodos } from './todos.actions';
import ITodo from '../../shared/interfaces/ITodo.interface';

@Injectable()
export class TodosFacade {
  public todos$ = this.store.select(todosQuery.getTodos);

  constructor(private store: Store<Todos>) {}

  public setTodos(todos: ITodo[]): void {
    this.store.dispatch(setTodos({ todos }));
  }

  public fetchTodos(): void {
    this.store.dispatch(fetchTodosRequest());
  }

  public createTodo(todo: Partial<ITodo>): void {
    this.store.dispatch(createTodoRequest({ todo }));
  }
}
