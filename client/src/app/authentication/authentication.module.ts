import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { MaterialModule } from '../shared/modules/material.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { DetectCapsLockDirective } from '../shared/directives/DetectCapsLock.directive';

@NgModule({
  declarations: [LoginFormComponent, SigninFormComponent, DetectCapsLockDirective],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
