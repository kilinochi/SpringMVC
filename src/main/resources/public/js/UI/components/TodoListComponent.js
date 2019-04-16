import {createFromTemplate} from '../../utils/templatesManager.js';
import {Eventable} from "../../lib/Eventable.js";


export class TodoListComponent extends Eventable {

    constructor(root) {
        super();
        this._root = root;
    }

    addTodo(todoText) {
        const newItemHTML = createFromTemplate(
            'todoItemTemplate',
            {
                text: todoText,
            }
        );
        console.log(newItemHTML);

        this._root.appendChild(newItemHTML);
        this.trigger('checkedCountChanged');

        newItemHTML.querySelector('.custom-button_target').addEventListener('click', () => this.removeTodo(newItemHTML));
        newItemHTML.querySelector('.custom-checkbox_target').addEventListener('change', () => this.trigger('checkedCountChanged'));
    }

    calcUncompleted() {
        const listItems = this._root.querySelectorAll('.todos-list_item');
        let count = 0;
        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i].querySelector('.custom-checkbox_target');
            if (!listItem.checked) {
                count++;
            }
        }
        return count;
    }

    removeTodo(item) {
        this._root.removeChild(item);
        this.trigger('checkedCountChanged');
    }

    removeCompleted() {
        const listItems = this._root.querySelectorAll('.todos-list_item');
        for (let i = 0; i < listItems.length; i++) {
            const checkBox = listItems[i].querySelector('.custom-checkbox_target');
            if (checkBox.checked) {
                this.removeTodo(listItems[i]);
            }
        }
    }

    markAllAsDone() {
        const listItems = this._root.querySelectorAll('.todos-list_item');
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].querySelector('.custom-checkbox_target').checked = true;
        }
        this.trigger('checkedCountChanged');
    }

    applyFilter(currentFilter) {
        switch (currentFilter) {
            case 'All': {
                this.disableFilter();
                break;
            }
            case 'Active': {
                this.filterActive();
                break;
            }
            case 'Completed': {
                this.filterCompleted();
            }
        }
    }

    filterActive() {
        const listItems = this._root.querySelectorAll('.todos-list_item');
        for (let i = 0; i < listItems.length; i++) {
            const checkBox = listItems[i].querySelector('.custom-checkbox_target');
            if (checkBox.checked) {
                listItems[i].style.display = "none";
            } else {
                listItems[i].style.display = "block";
            }
        }
    }

    filterCompleted() {
        const listItems = this._root.querySelectorAll('.todos-list_item');
        for (let i = 0; i < listItems.length; i++) {
            const checkBox = listItems[i].querySelector('.custom-checkbox_target');
            if (!checkBox.checked) {
                listItems[i].style.display = "none";
            } else {
                listItems[i].style.display = "block";
            }
        }
    }

    disableFilter() {
        const listItems = this._root.querySelectorAll('.todos-list_item');
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].style.display = "block";
        }
    }
}