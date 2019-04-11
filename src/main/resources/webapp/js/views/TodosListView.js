import template from '../templates/Template';
import TodoView from './TodoView';
import {events, modifiers} from '../constants';

export default class TodosListView {
    constructor(model, controller) {
        this.model = model;
        this.filter = this.filterAll;
        this.controller = controller;
        this.children = model.getList().map(todo => new TodoView(todo, controller));
        this.elements = template.listOf(this.children);
        this.updateUnreadyCounter();

    model
        .on(events.NEW_TODO, (todo) => this.addTodo(todo))
        .on(events.EDIT_TODO, (todo) => this.updateUnreadyCounter())
        .on(events.REMOVE_TODO, (todo) => this.removeTodo(todo))
        .on(events.CLEAR_COMPLETED, () => this.clearCompleted())
        .on(events.MARK_ALL_TODO, (ready) => this.markAllAs(ready))
        .on(events.STOP_EDITING_ALL_TODO, () => this.stopEditingAllTodos());

    this.elements.toolBar.querySelector('.filters_all').addEventListener('click', () => {
        this.filter = this.filterAll;
        this.filterAll();
        this.stopEditingAllTodos();
    });

    this.elements.toolBar.querySelector('.filters_active').addEventListener('click', () => {
        this.filter = this.filterActive;
        this.filterActive();
        this.stopEditingAllTodos();
    });

    this.elements.toolBar.querySelector('.filters_completed').addEventListener('click', () => {
        this.filter = this.filterCompleted;
        this.filterCompleted();
        this.stopEditingAllTodos();
    });

    this.elements.toolBar.querySelector('.todos-toolbar_clear-completed')
        .addEventListener('click', () => {
        this.controller.clearCompleted();
        this.stopEditingAllTodos();
        });
    }

    filterAll = () => {
        this.elements.toolBar.querySelectorAll('.todos-toolbar_filter')
                .forEach(filter => filter.classList.remove(modifiers.SELECT_FILTER_MODIFIER));
        this.elements.toolBar.querySelector('.filters_all')
                .classList.add(modifiers.SELECT_FILTER_MODIFIER);
        this.children.forEach(todo => todo.getRoot().style.display = 'block');
    };

    filterActive = () => {
        this.elements.toolBar.querySelectorAll('.todos-toolbar_filter')
                .forEach(filter => filter.classList.remove(modifiers.SELECT_FILTER_MODIFIER));
        this.elements.toolBar.querySelector('.filters_active')
                .classList.add(modifiers.SELECT_FILTER_MODIFIER);
        this.children.forEach(todo => {
            todo.getRoot().style.display = 'block';
          if (todo.model.ready) {
            todo.getRoot().style.display = 'none';
          }
        });
    };

    filterCompleted = () => {
        this.elements.toolBar.querySelectorAll('.todos-toolbar_filter')
                .forEach(filter => filter.classList.remove(modifiers.SELECT_FILTER_MODIFIER));
        this.elements.toolBar.querySelector('.filters_completed')
                .classList.add(modifiers.SELECT_FILTER_MODIFIER);
        this.children.forEach(todo => {
            todo.getRoot().style.display = 'block';
            if (!todo.model.ready) {
                todo.getRoot().style.display = 'none';
            }
        });
    };

    addTodo = (todo) => {
        const newTodoView = new TodoView(todo, this.controller);
        if (this.children.length === 0){
            this.getRoot().appendChild(newTodoView.getRoot());
        } else {
              const lastTodoView = this.children[this.children.length - 1];
              lastTodoView.getRoot().parentNode
                    .insertBefore(newTodoView.getRoot(), lastTodoView.getRoot().nextSibling);
        }
        this.children.push(newTodoView);
        this.filter();
        this.updateUnreadyCounter();
        this.stopEditingAllTodos();
    };

    removeTodo = (todo) => {
        const removedIndex = this.children.map(t => t.model.id).indexOf(todo.id);
        this.children[removedIndex].removeFromList();
        this.children.splice(removedIndex, 1);
        this.updateUnreadyCounter();
        this.stopEditingAllTodos();
    };

    markAllAs = (ready) => {
        this.children.forEach(todo => todo.markAsReady(ready));
        this.filter();
        this.updateUnreadyCounter();
        this.stopEditingAllTodos();
    };

    clearCompleted = () => {
        this.children.forEach(todo => {
            if (todo.model.ready){
                todo.removeFromList();
            }
        });
        this.children = this.children.filter(todo => !todo.model.ready);
    };

    updateUnreadyCounter = () => {
        this.controller.countActive().then((numActiveTodos) => {
            const unreadyCounter = this.elements.toolBar
                    .querySelector('.todos-toolbar_unready-counter');
            unreadyCounter.textContent = '';
            unreadyCounter.appendChild(document.createTextNode(`${numActiveTodos} items left`));
        });
    };

    stopEditingAllTodos = () => {
        this.children
            .forEach(todo => todo.getRoot().classList.remove(modifiers.EDIT_TODO_MODIFIER));
    };

    getRoot = () => this.elements.root;

    getToolBar = () => this.elements.toolBar;
}