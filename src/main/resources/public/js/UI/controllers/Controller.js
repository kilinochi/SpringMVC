import {Observable} from "../../lib/Observable.js";

export class Controller extends Observable {

    constructor() {
        super();

        this._todoCreatorTextInput = document.querySelector(".todo-creator_text-input");
        this._todoCreatorTextInput.addEventListener("keydown", this.textInputListener.bind(this));

        this._checkAllButton = document.querySelector(".todo-creator_check-all");
        this._checkAllButton.addEventListener("click", this.checkAllButtonListener.bind(this));

        this._allButton = document.querySelector(".filters-item-all");
        this._allButton.addEventListener("click", this.allButtonListener.bind(this));

        this._completedButton = document.querySelector(".filters-item-completed");
        this._completedButton.addEventListener("click", this.completedButtonListener.bind(this));

        this._activeButton = document.querySelector(".filters-item-active");
        this._activeButton.addEventListener("click", this.activeButtonListener.bind(this));

        this._clearCompletedButton = document.querySelector(".todos-toolbar_clear-completed");
        this._clearCompletedButton.addEventListener("click", this.clearCompletedButtonListener.bind(this));
    }

    textInputListener(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            let task = this._todoCreatorTextInput.value.trim();
            this.notifyAll("addition request", task);
        }
    }

    checkAllButtonListener(e) {
        e.preventDefault();
        this.notifyAll("check all clicked", "");
    }

    allButtonListener(e) {
        this.notifyAll("switched to all", "");
    }

    completedButtonListener(e) {
        this.notifyAll("switched to completed", "");
    }

    activeButtonListener(e) {
        this.notifyAll("switched to active", "");
    }

    clearCompletedButtonListener(e) {
        this.notifyAll("request to clear completed", "");
    }

    /*
     * @param {string} eventDescription,
     * @param {object} message
     *
     * */
    update(eventDescription, message) {
        switch (eventDescription) {
        case "todo added":
            this.addListenersToLastTodo();
            break;
        }
    }

    addListenersToLastTodo() {
        let todosList = document.querySelector(".todos-list");
        let deleteButtons = todosList.querySelectorAll(".custom-delete-button");
        let checkboxes = todosList.querySelectorAll('.custom-checkbox_target');
        deleteButtons[deleteButtons.length - 1].addEventListener("click", this.deleteButtonListener.bind(this));
        checkboxes[checkboxes.length - 1].addEventListener('click', this.checkboxListener.bind(this));
    }

    deleteButtonListener(e) {
        e.preventDefault();
        let trg = e.target;
        let task = trg.closest(".todos-list_item");
        this.notifyAll("deletion request", task);
    }

    checkboxListener(e) {
        let trg = e.target;
        this.notifyAll("checkbox touched", trg);
    }
}