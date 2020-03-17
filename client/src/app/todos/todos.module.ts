import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TodosService } from './+state/todos.service';
import { TodosEffects } from './+state/todos.effects';
import { TodosRoutingModule } from './todos-routing.module';
import { MaterialModule } from '../shared/modules/material.module';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TODOS_FEATURE_KEY, todosReducer } from './+state/todos.reducer';
import { TodosFacade } from './+state/todos.facade';

@NgModule({
  declarations: [TodosListComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    DragDropModule,
    TodosRoutingModule,
    EffectsModule.forFeature([TodosEffects]),
    StoreModule.forFeature(TODOS_FEATURE_KEY, todosReducer),
  ],
  providers: [TodosService, TodosEffects, TodosFacade],
})
export class TodosModule {}
