import { Controller, Get, Post, Body, Logger, Patch, Param, Delete } from '@nestjs/common';
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
  addTodo(@Body() todo: Partial<ITodo>): firebase.database.ThenableReference {
    return this.todoService.createTodo(todo);
  }

  @Patch('/:id')
  async updateTodo(@Param('id') id: string, @Body() todo: Partial<ITodo>): Promise<Partial<ITodo>> {
    await this.todoService.updateTodo(id, todo);
    return todo;
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
