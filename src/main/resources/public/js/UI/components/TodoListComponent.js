import {createFromTemplate} from '../../utils/templatesManager.js';
import {Eventable} from "../../lib/Eventable.js";
import {request} from "../../TodoService.js";


export class TodoListComponent extends Eventable {

    constructor(root) {
        super();
        this._root = root;
    }

    addTodo(todoObj) {
        const newItemHTML = createFromTemplate(
            'todoItemTemplate',
            {
                text: todoObj.description,
            }
        );
        console.log(newItemHTML);

        this._root.appendChild(newItemHTML);
        this.trigger('checkedCountChanged');

        newItemHTML.setAttribute('id', todoObj.id);

        var checkBox = newItemHTML.querySelector('.custom-checkbox_target');
        checkBox.checked = todoObj.completed;

        newItemHTML.querySelector('.custom-button_target').addEventListener('click', () => request("POST", "/delete?id=" + newItemHTML.id, () => this.removeTodo(newItemHTML)));
        checkBox.addEventListener('change', () => 
        	request("POST", 
        		'/update?id=' + newItemHTML.id + 
        		'&description=' + newItemHTML.querySelector('.todos-list_item_text').innerHTML +
        		'&completed=' + checkBox.checked, () => this.trigger('checkedCountChanged')));
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

    handleCreateResponse(todoObj) {
    	this.addTodo(todoObj);
    }

    handleReadResponse(todoArray) {
    	for (let i = 0; i < todoArray.length; i++) {
            this.addTodo(todoArray[i]);
        }
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
                request("POST", "/delete?id=" + listItems[i].id, () => this.removeTodo(listItems[i]));
            }
        }
    }

    markAllAsDone() {
        request("POST", '/checkAll', () => { 
        	const listItems = this._root.querySelectorAll('.todos-list_item');
	        for (let i = 0; i < listItems.length; i++) {
	            listItems[i].querySelector('.custom-checkbox_target').checked = true;
	        }
	        this.trigger('checkedCountChanged');
	    });
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