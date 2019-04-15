import { createFromTemplate } from '../../utils/templatesManager.js';
import { Eventable } from '../../lib/Eventable.js';


export class TodoListComponent extends Eventable {

    constructor(root) {
        super();
        this._root = root;
    }

    addTodo(id, todoText, isChecked) {
        const newItemHTML = createFromTemplate(
            'todoItemTemplate',
            {
                text: todoText,
                checked: isChecked
            }
        );
        console.log(newItemHTML);

        this._root.appendChild(newItemHTML);

        this._remove = newItemHTML.querySelector('.jsTodoRemove');
        this._remove.addEventListener('click', this.removeItem.bind(this, id, newItemHTML));

        this._markAsCompleted = newItemHTML.querySelector('.jsTodoCheckbox');
        this._markAsCompleted.addEventListener('click', this.toggleItem.bind(this, id, this._markAsCompleted.checked, newItemHTML));
    }

    removeItem(id, item) {
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200){
                    item.remove();
                }
            }
        }
        httpRequest.open("DELETE", "http://localhost:8080/api/todos/" + id, true);
        httpRequest.send();
    }

    toggleItem(id, checked, item) {
        const newState = !checked;
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200){
                    item.classList.toggle("__checked");
                }
            }
        }
        httpRequest.open("PUT", "http://localhost:8080/api/todos/" + id, true);
        httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF8");
        httpRequest.send(JSON.stringify({"description":null, "checked":newState}));
    }
}

