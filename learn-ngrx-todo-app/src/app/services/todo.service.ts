import { Injectable } from '@angular/core';
import Todo from '../models/todo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  todos: any[] = [
    {
      _id: '1',
      title: 'First To Do',
      description: 'Learn NgRx',
      date: new Date(),
      status: 'done'
    },
    {
      _id: '2',
      title: 'Second To Do',
      description: 'Go Home',
      date: new Date(),
      status: 'new'
    }
  ];

  private getNextId(): string {
    let maxId = 0;
    this.todos.forEach(todo => {
      if (Number(todo._id) > maxId) {
        maxId = Number(todo._id);
      }
    }
    );
    return String(maxId + 1);
  }

  getTodo(id: string): Observable<any> {
    return of(this.todos.find(todo => todo._id === id).First());
  }
  getTodos(): Observable<any[]> {
    return of(this.todos);
  }

  createTodo(todo: Todo): Observable<any> {
    const newToDo = {
      _id: this.getNextId(),
      title: todo.title,
      description: todo.description,
      date: todo.date,
      status: 'new'
    };
    this.todos.push(newToDo);
    return of({ ...todo, ...newToDo });
  }

  deleteTodo(id: string): void {
    const index = this.todos.findIndex(todo => todo._id === id);
    this.todos.splice(index, 1);
  }

  updateTodo(todo: Todo): void {
    const index = this.todos.findIndex(t => t._id === todo._id);
    if (index !== -1) {
      this.todos[index] = todo;
    }
  }

  completeTodo(id: string): void {
    this.todos.map(todo => {
      if (todo._id === id) {
        return { ...todo, status: 'done' };
      } else { return todo; }
    }
    );
  }
}
