import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.authenticationService
      .getUser()
      .pipe(
        tap(user => {
          if (Boolean(user)) this.router.navigate(['/todos', { queryParams: { user } }]);
        }),
      )
      .subscribe();
  }
}
