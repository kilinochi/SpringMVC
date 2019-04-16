import {createFromTemplate} from '../../utils/templatesManager.js';

import {COMPLETED_VALUE} from '../../lib/CONST.js';
import {HIDDEN_VALUE} from '../../lib/CONST.js';

export class TodoListComponent {

    constructor(root, todoList) {
        this._root = root;
        this._list = todoList;
    }

    _setReadyModificator(item, value) {
        if (value === true)
            item.classList.add(COMPLETED_VALUE);
        else
            item.classList.remove(COMPLETED_VALUE);

        item.querySelector('.custom-checkbox_target').checked = value;
    }

    checkVisibility(item) {
        switch (this._list.getFilter()) {
            case 'all':
                item.classList.remove(HIDDEN_VALUE);
                break;
            case 'active':
                if (item.classList.contains('__completed'))
                    item.classList.add(HIDDEN_VALUE);
                else
                    item.classList.remove(HIDDEN_VALUE);
                break;
            case 'completed':
                if (!item.classList.contains('__completed'))
                    item.classList.add(HIDDEN_VALUE);
                else
                    item.classList.remove(HIDDEN_VALUE);
                break
        }
    }

    markAsDone(item) {
        this._setReadyModificator(item, true);
        this.checkVisibility(item);
    }

    removeTodo(item) {
        var list = this._list;
        console.log(item.id);
        var request = new XMLHttpRequest();
        request.open('DELETE', '/delete?id=' + item.id, true);
        request.addEventListener('readystatechange', function () {
            if ((request.readyState === 4) && (request.status === 200)) {
                item.parentNode.removeChild(item);
                list.trigger('itemDelete');
            }
        });
        request.send();

    }

    editState(item) {
        if (item.classList.contains(COMPLETED_VALUE))
            this._setReadyModificator(item, false);
        else
            this._setReadyModificator(item, true);
        this._list.trigger('itemCheck');
        this.checkVisibility(item);
        this.updateItem(item.id, null, item.classList.contains(COMPLETED_VALUE));
    }

    createTodo(todoName) {
        var list = this._list;
        var component = this;
        var request = new XMLHttpRequest();
        request.open('POST', '/create', true);
        request.addEventListener('readystatechange', function () {
            if ((request.readyState === 4) && (request.status === 200)) {
                component.addTodo(todoName, request.responseText);
                list.trigger('itemAdd');
            }
        });
        var frm = new FormData();
        frm.append('description', todoName);
        request.send(frm);
    }


    addTodo(todoText, id) {
        const newItemHTML = createFromTemplate(
            'todoItemTemplate',
            {
                text: todoText,
            }
        );
        console.log(newItemHTML);
        this._root.appendChild(newItemHTML);
        var removeItems = this._root.querySelectorAll('.todos-list_item_remove');
        var checkItems = this._root.querySelectorAll('.custom-checkbox_target');
        var removeItem = removeItems[removeItems.length - 1];
        var checkItem = checkItems[checkItems.length - 1];
        var parent = this;
        var editTexts = this._root.querySelectorAll('.todos-list_item_text');
        var editText = editTexts[editTexts.length - 1];
        this._root.lastChild.closest('.todos-list_item').id = id;
        removeItem.addEventListener('click', function () {
            parent.removeTodo(this.closest('.todos-list_item'));
        });

        checkItem.addEventListener('click', function () {
            parent.editState(this.closest('.todos-list_item'));
        });

        editText.addEventListener('input', function () {
            parent.updateItem(id, editText.innerHTML, this.closest('.todos-list_item').classList.contains(COMPLETED_VALUE));
        })

        this.checkVisibility(this._root.lastChild);
        return this._root.lastChild;
    }

    updateItem(id, description, checked) {
        console.log(id + " " + description + " " + checked);
        var request = new XMLHttpRequest();
        request.open('POST', '/update', true);
        request.addEventListener('readystatechange', function () {
            if ((request.readyState === 4) && (request.status === 200)) {
                console.log("checked");
            }
        });
        var frm = new FormData();
        frm.append('id', id);
        if (description != null) {
            frm.append('description', description);
        }
        frm.append('checked', checked);
        request.send(frm);
    }


}

