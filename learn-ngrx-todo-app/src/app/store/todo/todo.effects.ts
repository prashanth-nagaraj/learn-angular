import { mapTo, catchError, mergeMap, map, concatMap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, empty } from 'rxjs';
import * as TodoActions from './todo.actions';
import { TodoState } from './todo.state';
import { TodoService } from 'src/app/services/todo.service';


@Injectable()

export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) { }

  @Effect()
  GetTodo$: Observable<Action> = this.actions$.pipe(
    ofType<TodoActions.GetTodo>(TodoActions.GET_TODO),
    mergeMap((action) => this.todoService.getTodo(action.payload)),
    map((todo) => new TodoActions.GetTodoSuccess(todo as TodoState)),
    catchError(() => of(new TodoActions.GetTodoError()))
  );

  @Effect()
  GetTodos$: Observable<Action> = this.actions$.pipe(
    ofType<TodoActions.GetTodos>(TodoActions.GET_TODOS),
    mergeMap(() => this.todoService.getTodos()),
    map((todos) => new TodoActions.GetTodosSuccess(todos as TodoState[])),
    catchError(() => of(new TodoActions.GetTodosError()))
  );

  @Effect()
  CreateTodo$: Observable<Action> = this.actions$.pipe(
    ofType<TodoActions.CreateTodo>(TodoActions.CREATE_TODO),
    mergeMap((action) => this.todoService.createTodo(action.payload)),
    map((todo) => new TodoActions.CreateTodoSuccess({ ...todo, loading: false })),
    catchError(() => of(new TodoActions.CreateTodoError()))
  );

  @Effect()
  DeleteTodo$: Observable<Action> = this.actions$.pipe(
    ofType<TodoActions.DeleteTodo>(TodoActions.DELETE_TODO),
    mergeMap((action) => {
      this.todoService.deleteTodo(action.payload._id);
      return of(new TodoActions.DeleteTodoSuccess({ ...action.payload, loading: false }));
    }
    ),
    catchError((action) => of(new TodoActions.DeleteTodoError(action.payload)))
  );

  @Effect()
  UpdateTodo$: Observable<Action> = this.actions$.pipe(
    ofType<TodoActions.UpdateTodo>(TodoActions.UPDATE_TODO),
    mergeMap((action) => {
      this.todoService.updateTodo(action.payload);
      return of(new TodoActions.UpdateTodoSuccess({ ...action.payload, loading: false, editing: false }));
    }),
    catchError((action) => of(new TodoActions.UpdateTodoError(action.payload)))
  );

  @Effect()
  CompleteTodo$ = this.actions$.pipe(
    ofType<TodoActions.CompleteTodo>(TodoActions.COMPLETE_TODO),
    mergeMap((action) => {
      this.todoService.completeTodo(action.payload._id);
      return empty();
    })
  );
}


