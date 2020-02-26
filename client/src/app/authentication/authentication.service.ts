import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { throttleTime, tap, catchError } from 'rxjs/operators';

import { IUserProfile, IUserLogin } from '../shared/interfaces/IUser.interface';

const API = 'http://localhost:3000/api/authentication';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly snack: MatSnackBar,
  ) {}

  public getUser(): Observable<IUserProfile> {
    const URL = `${API}/current-user`;
    return this.http.get<IUserProfile>(URL);
  }

  public login(user: IUserLogin): Observable<IUserProfile> {
    const URL = `${API}/login`;
    return this.http
      .post<IUserProfile>(URL, { ...user })
      .pipe(
        throttleTime(500),
        tap(userProfile => console.log(userProfile)),
        tap(userProfile => {
          if (Boolean(userProfile)) this.router.navigate(['/todos']);
        }),
        catchError(({ error }) => {
          this.snack.open(error.message, 'Close', { duration: 4000 });
          return EMPTY;
        }),
      );
  }
}
