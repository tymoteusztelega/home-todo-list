import { Action, createReducer, on } from '@ngrx/store';
import * as R from 'ramda';

import ITodo from '../../shared/interfaces/ITodo.interface';
import {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  setTodos,
  createTodoRequest,
  createTodoSuccess,
  createTodoFailure,
} from './todos.actions';

export const TODOS_FEATURE_KEY = 'todos';

export interface Todos {
  isFetching;
  error: any;
  todos: ITodo[];
}

export const initialState: Todos = {
  isFetching: false,
  error: {},
  todos: [],
};

const clearTodosInState = (state: Todos): Todos => ({ ...state, todos: [] });
const errorOccurred = (state: Todos, { error }): Todos => ({ ...state, error });
const fetchingStarted = (state: Todos): Todos => ({ ...state, isFetching: true });
const fetchingStopped = (state: Todos): Todos => ({ ...state, isFetching: false });
const updateTodosInState = (state: Todos, { todos }): Todos => ({ ...state, todos });

const reducer = createReducer(
  initialState,
  on(setTodos, updateTodosInState),
  on(createTodoRequest, fetchingStarted),
  on(fetchTodosRequest, R.compose(fetchingStarted, clearTodosInState)),
  on(fetchTodosFailure, createTodoFailure, R.compose(fetchingStopped, errorOccurred)),
  on(fetchTodosSuccess, createTodoSuccess, R.compose(fetchingStopped, updateTodosInState)),
);

export function todosReducer(state: Todos | undefined, action: Action) {
  return reducer(state, action);
}
