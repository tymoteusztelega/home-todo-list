import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import ITodo from '../../shared/interfaces/ITodo.interface';
import { environment } from '../../../environments/environment';

const TODOS_URL = `${environment.API}todos`;

@Injectable()
export class TodosService {
  constructor(private readonly http: HttpClient) {}

  public getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(TODOS_URL);
  }

  public updateTodo({ id, ...rest }: ITodo): Observable<ITodo> {
    const url = `${TODOS_URL}/${id}`;
    return this.http.patch<ITodo>(url, { ...rest });
  }

  public createTodo(todo: Partial<ITodo>): Observable<ITodo> {
    return this.http.post<ITodo>(TODOS_URL, todo);
  }

  public deleteTodo(id: string): Observable<void> {
    const url = `${TODOS_URL}/${id}`;
    return this.http.delete<void>(url);
  }
}
