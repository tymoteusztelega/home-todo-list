import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { IUserLogin } from '../../shared/interfaces/IUser.interface';
import { tap, catchError, throttleTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup;
  public capsOn: boolean;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly snack: MatSnackBar,
    private readonly authenticationService: AuthenticationService,
  ) {}

  public ngOnInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(user: IUserLogin) {
    this.authenticationService.login(user).subscribe();
  }
}
