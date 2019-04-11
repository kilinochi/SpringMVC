import template from '../templates/Template';
import TodosListView from './TodosListView';
import { events } from "../constants";

export class TodoCreatorView {
    constructor(model, controller){
        this.model = model;
        this.controller = controller;
        this.elements = template.todoCreator();

        model
             .on(events.REMOVE_TODO, () => {
                 if (this.controller.getList().length === 0){
                     this.hideFullInterface();
                 }
             })
             .on(events.CLEAR_COMPLETED, () => {
                 if (this.controller.getList().length === 0){
                     this.hideFullInterface();
                 }
             })
             .on(events.COUNT_ACTIVE_TODO, (cnt) => {
                 this.allMarkedAs = cnt === 0;
             });

        if (controller.getList().length !== 0){
            this.showFullInterface();
        }

        this.elements.checkAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.controller.markAllAs(!this.allMarkedAs);
            this.allMarkedAs = !this.allMarkedAs;
        });

        this.elements.textInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                const text = this.elements.textInput.value.trim();
                this.elements.textInput.value = '';
                const noElements = controller.getList().length === 0;
                if (text !== '') {
                    this.controller.addTodo(text);
                    if (noElements) {
                        this.showFullInterface();
                    }
                }
            }
        });
    }

    showFullInterface = () => {
        const todosList = new TodosListView(this.model, this.controller);
        this.elements.root.parentNode.appendChild(todosList.getRoot());
        this.elements.root.parentNode.appendChild(todosList.getToolBar());
    };

    hideFullInterface = () => {
        const listTodos = this.elements.root.parentNode.querySelector('.todos-list');
        const toolBar = this.elements.root.parentNode.querySelector('.todos-toolbar');
        this.elements.root.parentNode.removeChild(listTodos);
        this.elements.root.parentNode.removeChild(toolBar);
    };
}