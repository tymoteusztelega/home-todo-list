import { tap, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import ITodo from '../todo.interface';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
})
export class TodosListComponent implements OnInit {
  public todos: ITodo[];
  public todo: ITodo[];
  public done: ITodo[];

  public todoDescription: string;

  constructor(private readonly todosService: TodosService) {}

  ngOnInit() {
    this.todosService
      .getTodos()
      .pipe(
        tap(todos => {
          this.todo = todos.filter(t => !t.isDone);
          this.done = todos.filter(t => t.isDone);
        }),
        take(1),
      )
      .subscribe();
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

    if (isTheSameContainer) moveItemInArray(container.data, previousIndex, currentIndex);
    else {
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

    this.todosService
      .createTodo({ description: this.todoDescription })
      .pipe(
        tap(() => (this.todoDescription = '')),
        tap(newTodo => this.todo.push(newTodo)),
        take(1),
      )
      .subscribe();
  }
}
