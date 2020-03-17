import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { TodosService } from './todos.service';
import {
  fetchTodosRequest,
  fetchTodosFailure,
  fetchTodosSuccess,
  createTodoRequest,
  createTodoSuccess,
  createTodoFailure,
} from './todos.actions';
import { TodosFacade } from './todos.facade';

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private todosService: TodosService,
    private todosFacade: TodosFacade,
  ) {}

  public fetchTodos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTodosRequest),
      switchMap(() =>
        this.todosService.getTodos().pipe(
          map(todos => fetchTodosSuccess({ todos })),
          catchError(error => of(fetchTodosFailure({ error }))),
        ),
      ),
    ),
  );

  public createTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTodoRequest),
      withLatestFrom(this.todosFacade.todos$),
      switchMap(([{ todo }, todos]) =>
        this.todosService.createTodo(todo).pipe(
          map(todo => createTodoSuccess({ todos: [...todos, todo] })),
          catchError(error => of(createTodoFailure({ error }))),
        ),
      ),
    );
  });
}
