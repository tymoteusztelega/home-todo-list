import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { SigninFormComponent } from './signin-form/signin-form.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'signin', component: SigninFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
