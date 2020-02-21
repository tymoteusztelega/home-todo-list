import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import ITodo from './todo.interface';
import { TodoService } from './todo.service';

@Controller('/api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  async getTodos(): Promise<ITodo[]> {
    return await this.todoService.getTodos();
  }

  @Post('/')
  addTodo(@Body() todo: Partial<ITodo>): ITodo {
    Logger.log({ todo });
    return {
      ...todo,
      creationDate: new Date(),
      isDone: false,
    } as ITodo;
  }
}
