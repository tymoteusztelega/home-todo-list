import { createAction, props } from '@ngrx/store';

import ITodo from '../../shared/interfaces/ITodo.interface';

/* Set Todos */
export const setTodos = createAction('[Todos] Set Todos', props<{ todos: ITodo[] }>());

/* Fetch Todos */
export const fetchTodosRequest = createAction('[Todos] Fetch Todos Request');
export const fetchTodosSuccess = createAction(
  '[Todos] Fetch Todos Success',
  props<{ todos: ITodo[] }>(),
);
export const fetchTodosFailure = createAction(
  '[Todos] Fetch Todos Failure',
  props<{ error: any }>(),
);

/* Create Todo */
export const createTodoRequest = createAction(
  '[Todos] Create Todo Request',
  props<{ todo: Partial<ITodo> }>(),
);
export const createTodoSuccess = createAction(
  '[Todos] Create Todo Success',
  props<{ todos: ITodo[] }>(),
);
export const createTodoFailure = createAction(
  '[Todos] Create Todo Failure',
  props<{ error: any }>(),
);

/* Update Todo */
export const updateTodoRequest = createAction(
  '[Todos] Update Todo Request',
  props<{ todo: ITodo }>(),
);
export const updateTodoSuccess = createAction(
  '[Todos] Update Todo Success',
  props<{ todos: ITodo[] }>(),
);
export const updateTodoFailure = createAction(
  '[Todos] Update Todo Failure',
  props<{ error: any }>(),
);
