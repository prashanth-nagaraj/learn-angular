import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoListState, TodoState } from 'src/app/store/todo/todo.state';
import { Observable } from 'rxjs';
import * as TodoActions from '../../store/todo/todo.actions';

export interface AppState {
  todos: TodoListState;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<TodoState[]>;

  constructor(private store: Store<TodoListState>) { }

  ngOnInit() {
    this.todos$ = this.store.select(state => state.todos);
    this.store.dispatch(new TodoActions.GetTodos());
  }

  onCreate(todo) {
    console.log(todo);
    this.store.dispatch(new TodoActions.CreateTodo(todo));
  }

  onDelete(todo) {
    this.store.dispatch(new TodoActions.DeleteTodo(todo));
  }

  onEdit(todo) {
    this.store.dispatch(new TodoActions.UpdateTodo(todo));
  }

  completeTodo(todo) {
    this.store.dispatch(new TodoActions.CompleteTodo(todo));
  }
}
