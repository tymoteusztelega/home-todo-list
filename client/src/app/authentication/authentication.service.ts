import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUserProfile } from '../shared/interfaces/IUser.interface';

const API = 'http://localhost:3000/api/authentication';

@Injectable()
export class AuthenticationService {
  constructor(private readonly http: HttpClient) {}

  public getUser(): Observable<IUserProfile> {
    const URL = `${API}/current-user`;
    return this.http.get<IUserProfile>(URL);
  }
}
