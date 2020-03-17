import { tap, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import ITodo from '../../shared/interfaces/ITodo.interface';
import { TodosFacade } from '../+state/todos.facade';
import { TodosService } from '../+state/todos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {
  public todo: ITodo[];
  public done: ITodo[];
  public todoDescription: string;

  private _subscriptionHandler = new Subscription();

  constructor(
    private readonly todosFacade: TodosFacade,
    private readonly todosService: TodosService,
  ) {}

  ngOnInit() {
    this.todosFacade.fetchTodos();

    this._subscriptionHandler.add(
      this.todosFacade.todos$
        .pipe(
          tap(todos => {
            this.todo = todos.filter(t => !t.isDone);
            this.done = todos.filter(t => t.isDone);
          }),
        )
        .subscribe(),
    );
  }

  public drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    const { isPointerOverContainer } = event;

    if (!isPointerOverContainer) this.deleteTodo(event);
    else this.updateTodo(event);
  }

  private updateTodo(event: CdkDragDrop<string[]>) {
    console.log('Update', event);

    const { container, previousContainer, previousIndex, currentIndex, item } = event;
    const isTheSameContainer = previousContainer === container;

    if (isTheSameContainer) {
      moveItemInArray(container.data, previousIndex, currentIndex);
      this.todosFacade.setTodos([...this.todo, ...this.done]);
    } else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);

      const todo: ITodo = item.data;
      this.todosService
        .updateTodo({ ...todo, isDone: !todo.isDone })
        .pipe(
          tap(updatedTodo => console.log(updatedTodo)),
          take(1),
        )
        .subscribe();
    }
  }

  private deleteTodo(event: CdkDragDrop<string[]>) {
    console.log('Delete', event);

    const { item } = event;
    const { id, isDone }: ITodo = item.data;

    this.todosService
      .deleteTodo(id)
      .pipe(
        tap(() => {
          if (isDone) this.done = this.done.filter(d => d.id !== id);
          else this.todo = this.todo.filter(d => d.id !== id);
        }),
        take(1),
      )
      .subscribe();
  }

  public createTodo() {
    if (!this.todoDescription) return;

    this.todosFacade.createTodo({ description: this.todoDescription });
    this.todoDescription = '';
  }
}
