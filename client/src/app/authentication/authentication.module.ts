import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { AuthenticationService } from './authentication.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginFormComponent, SigninFormComponent],
  imports: [AuthenticationRoutingModule, HttpClientModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
