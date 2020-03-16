import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodosListComponent } from './todos-list/todos-list.component';
import { AuthenticationGuardService } from '../authentication/authentication-guard.service';

const routes: Routes = [
  { path: '', component: TodosListComponent, canActivate: [AuthenticationGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
