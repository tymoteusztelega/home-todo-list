import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';

import ITodo from './todo.interface';

const API = 'http://localhost:3000/api/todos';

@Injectable()
export class TodosService {
  constructor(private readonly http: HttpClient, private readonly snack: MatSnackBar) {}

  public getTodos(): Observable<ITodo[]> {
    const URL = `${API}`;
    return this.http.get<ITodo[]>(URL);
  }

  public updateTodo({ id, ...rest }: ITodo): Observable<ITodo> {
    const URL = `${API}/${id}`;
    return this.http.patch<ITodo>(URL, { ...rest });
  }

  public createTodo(todo: Partial<ITodo>): Observable<ITodo> {
    const URL = `${API}`;
    return this.http.post<ITodo>(URL, todo);
  }

  public deleteTodo(id: string): Observable<void> {
    const URL = `${API}/${id}`;
    return this.http.delete<void>(URL);
  }
}
