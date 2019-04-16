import {TodoCreatorComponent} from './UI/components/TodoCreatorComponent.js';
import {TodoListComponent} from './UI/components/TodoListComponent.js';
import {TodoToolbarComponent} from "./UI/components/TodoToolbarComponent.js";


const todoListElement = document.querySelector('.todos-list');
const todoListComponent = new TodoListComponent(todoListElement);

const todoCreatorElement = document.querySelector('.todo-creator');
const todoCreatorComponent = new TodoCreatorComponent(todoCreatorElement);

const todoToolbarElement = document.querySelector('.todos-toolbar');
const todoToolbarComponent = new TodoToolbarComponent(todoToolbarElement);

const url = 'http://localhost:8080';

let currentFilter = 'All';

todoCreatorComponent.on('todoAdded', text => {
    todoListComponent.addTodo(text);
});

todoCreatorComponent.on('markAllAsDone', () => {
    todoListComponent.markAllAsDone();
});

todoListComponent.on('checkedCountChanged', () => {
    let uncompletedCount = todoListComponent.calcUncompleted();
    todoToolbarComponent.updateCounter(uncompletedCount);
    todoListComponent.applyFilter(currentFilter);
});

todoToolbarComponent.on('clearCompleted', () => {
    todoListComponent.removeCompleted();
});

todoToolbarComponent.on('filterUpdated', (filter) => {
    if (filter !== null) {
        currentFilter = filter;
    }
    todoListComponent.applyFilter(currentFilter);
});

console.log('init');