import { TodoState, initializeTodoState, TodoListState, initializeTodoListState } from './todo.state';
import Todo from 'src/app/models/todo.model';
import * as TodoActions from '../todo/todo.actions';

export type Action = TodoActions.All;

const defaultTodoState: TodoState[] = [{
    ...Todo.generateMockTodo(),
    ...initializeTodoState()
}];

const defaultState: TodoListState = {
    todos: defaultTodoState,
    ...initializeTodoListState()
};

function modifyTodoState(state, todo: TodoState, modifications): TodoListState {

    return {
        ...state,
        todos: state.todos.map(t => {
            if (t._id === todo._id) {
                return { ...t, ...todo, ...modifications };
            } else {
                return t;
            }
        })
    };
}

export function TodoReducer(state = defaultState, action: Action) {
    console.log(state, action);
    switch (action.type) {
        case TodoActions.GET_TODOS: {
            return { ...state, loaded: false, loading: true };
        }
        case TodoActions.GET_TODOS_SUCCESS: {
            return {
                ...state,
                todos: [
                    ...action.payload,
                    defaultTodoState[0]
                ],
                loading: false
            };
        }
        case TodoActions.GET_TODOS_ERROR: {
            return state;
        }
        case TodoActions.CREATE_TODO: {
            return {
                ...state,
                todos: state.todos.map(t => {
                    if (t._id === action.payload._id) {
                        t.loading = true;
                    }
                    return t;
                })
            };
        }
        case TodoActions.CREATE_TODO_SUCCESS: {
            return {
                ...state,
                todos: [
                    ...state.todos.filter(t => {
                        return t._id !== 'new';
                    }), {
                        ...action.payload,
                        loading: false,
                        edited: true,
                        create: false
                    }, {
                        ...Todo.generateMockTodo(),
                        ...initializeTodoState()
                    }]
            };
        }
        case TodoActions.CREATE_TODO_ERROR: {
            return state;
        }
        case TodoActions.UPDATE_TODO: {
            return {
                ...state,
                todos: state.todos.map(t => {
                    if (t._id === action.payload._id) {
                        t.loading = true;
                    }
                    return t;
                })
            };
        }
        case TodoActions.UPDATE_TODO_SUCCESS: {
            return modifyTodoState(state, action.payload, {});
        }
        case TodoActions.UPDATE_TODO_ERROR: {
            return {
                ...state,
                todos: state.todos.map(t => {
                    if (t._id === action.payload._id) {
                        t.error = true;
                    }
                    return t;
                })
            };

        }
        case TodoActions.DELETE_TODO: {
            return { ...state, ...state.todos.splice(state.todos.indexOf(action.payload), 1) };
        }

        case TodoActions.DELETE_TODO_SUCCESS: {
            return state;
        }
        case TodoActions.DELETE_TODO_ERROR: {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    action.payload
                ]
            };
        }
        case TodoActions.COMPLETE_TODO: {
            return {
                ...state,
                todos: state.todos.map(t => {
                    if (t._id === action.payload._id) {
                        t.status = 'done';
                    }
                    return t;
                })
            };
        }
        default: return state;
    }
}
