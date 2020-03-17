import { createSelector, createFeatureSelector } from '@ngrx/store';

import { TODOS_FEATURE_KEY, Todos } from './todos.reducer';

const getTodosState = createFeatureSelector<Todos>(TODOS_FEATURE_KEY);

export const getTodos = createSelector(getTodosState, (state: Todos) => state.todos);
export const getIsFetching = createSelector(getTodosState, (state: Todos) => state.isFetching);

export const todosQuery = { getTodos, getIsFetching };
