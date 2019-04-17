import {createFromTemplate} from "../../utils/TemplateResolver.js";
import {Observable} from "../../lib/Observable.js";

export class View extends Observable {

    constructor() {
        super();
        this._todoListElement = document.querySelector('.todos-list');
        this._todoCreator = document.querySelector(".todo-creator");
        this._todosToolbarUnreadyCounter = document.querySelector(".todos-toolbar_unready-counter");
        this._todoBoard = document.querySelector(".todo-board");
        this._allButton = document.querySelector(".filters-item-all");
        this._completedButton = document.querySelector(".filters-item-completed");
        this._activeButton = document.querySelector(".filters-item-active");
    }

    /*
    * @param {string} text
    * @param {boolean} isVisible
    * */
    addTodo(text, isVisible) {
        const newItemHTML = createFromTemplate(
                'listItem',
                {
                    text: text,
                }
        );
        if (isVisible) {
            this.setVisible(newItemHTML);
        } else {
            this.setInvisible(newItemHTML);
        }
        this._todoListElement.appendChild(newItemHTML);
        this._todoCreator.reset();
        this.notifyAll("todo added", "");
    }

    /*
    * @param {number} amount
    * */
    updateAmountOfUndoneTasks(amount) {
        if (amount === 1) {
            this._todosToolbarUnreadyCounter.innerHTML = "1 item left";
        } else {
            this._todosToolbarUnreadyCounter.innerHTML = amount + " items left";
        }
    }

    deleteTodo(item) {
        item.parentNode.removeChild(item);
    }

    makeItemDone(item) {
        let task = item.querySelector(".todos-list_item_text");
        item.classList.add("__done");
        task.classList.add("line-through");
    }

    makeItemUndone(item) {
        let task = item.querySelector(".todos-list_item_text");
        item.classList.remove("__done");
        task.classList.remove("line-through");
    }

    expandBoard() {
        this._todoBoard.classList.add("__has-content");
    }

    shrinkBoard() {
        this._todoBoard.classList.remove("__has-content");
    }

    deleteDoneItems() {
        const checkboxes = document.querySelectorAll(".custom-checkbox_target");
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                let item = checkboxes[i].closest(".todos-list_item");
                this.deleteTodo(item);
            }
        }
    }

    makeAllItemsDone() {
        const checkboxes = document.querySelectorAll(".custom-checkbox_target");
        for (let i = 0; i < checkboxes.length; i++) {
            if (!checkboxes[i].checked) {
                checkboxes[i].checked = true;
                let item = checkboxes[i].closest(".todos-list_item");
                this.makeItemDone(item);
            }
        }
    }

    makeAllItemsUndone() {
        const checkboxes = document.querySelectorAll(".custom-checkbox_target");
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                checkboxes[i].checked = false;
                let item = checkboxes[i].closest(".todos-list_item");
                this.makeItemUndone(item);
            }
        }
    }

    makeAllItemsVisible() {
        let children = this._todoListElement.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("__hidden")) {
                children[i].classList.remove("__hidden");
            }
        }
    }

    makeOnlyDoneItemsVisible() {
        let children = this._todoListElement.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("__done")) {
                children[i].classList.remove("__hidden");
            } else {
                children[i].classList.add("__hidden");
            }
        }
    }

    makeOnlyUndoneItemsVisible() {
        let children = this._todoListElement.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains("__done")) {
                children[i].classList.add("__hidden");
            } else {
                children[i].classList.remove("__hidden");
            }
        }
    }

    setInvisible(item) {
        if (!item.classList.contains("__hidden")) {
            item.classList.add("__hidden");
        }
    }

    setVisible(item) {
        if (item.classList.contains("__hidden")) {
            item.classList.remove("__hidden");
        }
    }

    unselectButton(name) {
        switch (name) {
        case "all":
            this._allButton.classList.remove("__selected");
            break;
        case "active": this._activeButton.classList.remove("__selected");
            break;
        case "completed":
            this._completedButton.classList.remove("__selected");
            break;
        }
    }

    selectButton(name) {
        switch (name) {
        case "all": this._allButton.classList.add("__selected");
            break;
        case "active": this._activeButton.classList.add("__selected");
            break;
        case "completed": this._completedButton.classList.add("__selected");
            break;
        }
    }
}