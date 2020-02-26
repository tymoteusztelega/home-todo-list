import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authenticationService.getUser().pipe(
      tap(user => {
        console.log('User -> ', user);
        if (!user) {
          this.router.navigate(['/auth']);
        }
      }),
      map(user => Boolean(user)),
    );
  }
}
