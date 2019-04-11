import Dispatcher from './Dispatcher';
import todosService from '../services';
import { events } from "../constants";

export default class TodosListModel extends Dispatcher {
    constructor(){
        super();
        this.todos = [];
        this.activeTodos = 0;
        this.updateListTodos();
        this.countActive();
    }

    getList = () => this.todos;

    getActiveTodos = () => this.activeTodos;

    updateListTodos = () => {
        return todosService.getTodos().then((tds) => {
            this.todos = tds;
            this.dispatch(events.UPDATE_LIST_TODO, tds);
        });
    };

    addTodo = (text) => {
        todosService.addTodo(text).then((todo) => {
            this.updateListTodos().then(() => {
                this.dispatch(events.NEW_TODO, todo);
            });
        });
    };

    editTodo = (todo) => {
        todosService.editTodo(todo).then((todo) => {
            this.updateListTodos().then(() => {
                this.dispatch(events.EDIT_TODO, todo);
            });
        });
    };

    removeTodo = (todo) => {
        todosService.removeTodo(todo).then(() => {
            this.updateListTodos().then(() => {
                this.dispatch(events.REMOVE_TODO, todo);
            });
        });
    };

    markAllAs = (ready) => {
        todosService.markAllAs(ready).then(() => {
            this.updateListTodos().then(() => {
                this.dispatch(events.MARK_ALL_TODO, ready);
            });
        });
    };

    stopEditingAllTodos = (todo) => {
        this.dispatch(events.STOP_EDITING_ALL_TODO);
    };

    clearCompleted = () => {
        todosService.clearCompleted().then(() => {
            this.updateListTodos().then(() => {
                this.dispatch(events.CLEAR_COMPLETED);
            });

        });
    };

    countActive = () => {
        todosService.countActive().then((cnt) => {
            this.activeTodos = cnt;
            this.dispatch(events.COUNT_ACTIVE_TODO, cnt);
        })
    };
}