import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosService } from './todos.service';
import { MaterialModule } from '../shared/modules/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodosListComponent],
  imports: [CommonModule, DragDropModule, TodosRoutingModule, MaterialModule, FormsModule],
  providers: [TodosService],
})
export class TodosModule {}
