import template from '../templates/Template';
import TodoModel from '../models/TodoModel';
import { modifiers } from '../constants';

export default class TodoView  {
    constructor(data, controller){
        this.model = new TodoModel(data);
        this.controller = controller;
        this.elements = template.listItem(data);

        this.elements.readyMarker.addEventListener('click', () => {
            this.model.ready = !this.model.ready;
            if (this.model.ready) {
                this.getRoot().classList.add(modifiers.COMPLETED_MODIFIER);
            } else {
                this.getRoot().classList.remove(modifiers.COMPLETED_MODIFIER);
            }

            this.controller.stopEditingAllTodos();
            this.controller.editTodo(this.model);
        });

        this.elements.removeBtn.addEventListener('click', () => this.controller.removeTodo(this.model));

        this.elements.viewText.addEventListener('dblclick', () => this.startEditingTodo());

        this.elements.textInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                const newText = this.elements.textInput.value.trim();
                if (newText !== '') {
                    this.model.text = newText;
                    this.updateText(newText);
                    this.controller.editTodo(this.model);
                }
            }
        });
    }

    markAsReady = (ready) => {
        this.model.ready = ready;
        const checkbox = this.elements.readyMarker.querySelector('.custom-checkbox_target');
        checkbox.checked = ready;
        if (ready) {
            this.getRoot().classList.add(modifiers.COMPLETED_MODIFIER);
        } else {
            this.getRoot().classList.remove(modifiers.COMPLETED_MODIFIER);
        }
    };

    updateText = (newText) => {
        this.elements.viewText.textContent = '';
        this.elements.viewText.appendChild(document.createTextNode(newText || ''));
        this.elements.textInput.value = newText;

        this.getRoot().classList.remove(modifiers.EDIT_TODO_MODIFIER);
    };

    startEditingTodo = () => {
        this.controller.stopEditingAllTodos();
        this.getRoot().classList.add(modifiers.EDIT_TODO_MODIFIER);
        this.elements.textInput.focus();
    };

    removeFromList = () => {
        this.getRoot().parentNode.removeChild(this.getRoot())
    };

    getRoot = () => this.elements.root;
}
