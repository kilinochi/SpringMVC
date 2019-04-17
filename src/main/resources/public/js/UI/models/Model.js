
export class Model {

    constructor(view) {
        this._tasksTotal = 0;
        this._doneTasksTotal = 0;
        this._view = view;
        this._mode = "all";
    }

    /*
    * @param {string} eventDescription,
    * @param {object} message
    *
    * */
    update(eventDescription, message) {
        switch (eventDescription) {
        case "addition request":
            this.addTask(message);
            break;
        case "deletion request":
            this.deleteTask(message);
            break;
        case "checkbox touched":
            this.processChecking(message);
            break;
        case "check all clicked":
            this.checkAll();
            break;
        case "switched to all":
            this.all();
            break;
        case "switched to completed":
            this.completed();
            break;
        case "switched to active":
            this.active();
            break;
        case "request to clear completed":
            this.clearCompleted();
            break;
        }
    }

    /*
    * @param {string} text
    *
    * */
    addTask(text) {
        if (text !== "") {
            if (this._tasksTotal === 0) {
                this._view.expandBoard();
            }
        this._tasksTotal++;
        this._view.addTodo(text, this._mode !== "completed");
        this.renderAmountOfUnreadyTasks();
        }
    }

    deleteTask(item) {
        this._tasksTotal--;
        if (this._tasksTotal === 0) {
            this._view.shrinkBoard();
        }
        if (item.classList.contains("__done")) {
            this._doneTasksTotal--;
        }
        this.renderAmountOfUnreadyTasks();
        this._view.deleteTodo(item);
    }

    processChecking(checkbox) {
        let item = checkbox.closest(".todos-list_item");
        if (checkbox.checked) {
            this._doneTasksTotal++;
            this._view.makeItemDone(item);
            if (this._mode === "active") {
                this._view.setInvisible(item);
            }
        } else {
            this._doneTasksTotal--;
            this._view.makeItemUndone(item);
            if (this._mode === "completed") {
                this._view.setInvisible(item);
            }
        }
        this.renderAmountOfUnreadyTasks();
    }

    renderAmountOfUnreadyTasks() {
        this._view.updateAmountOfUndoneTasks(this._tasksTotal - this._doneTasksTotal);
    }

    clearCompleted() {
        this._view.deleteDoneItems();
        this._tasksTotal-=this._doneTasksTotal;
        this._doneTasksTotal = 0;
        if (this._tasksTotal === 0) {
            this._view.shrinkBoard();
        }
    }

    checkAll() {
        if (this._tasksTotal !== this._doneTasksTotal) {
            this._doneTasksTotal = this._tasksTotal;
            this._view.makeAllItemsDone();
            this.renderAmountOfUnreadyTasks();
        } else {
            this._doneTasksTotal = 0;
            this.renderAmountOfUnreadyTasks();
            this._view.makeAllItemsUndone();
        }
        switch (this._mode) {
        case "all":
            this._view.makeAllItemsVisible();
            break;
        case "completed":
            this._view.makeOnlyDoneItemsVisible();
            break;
        case "active":
            this._view.makeOnlyUndoneItemsVisible();
            break;
        }
    }

    all() {
        if (this._mode !== "all") {
            this.unselectCurrentButton();
            this._mode = "all";
            this._view.makeAllItemsVisible();
            this.selectCurrentButton();
        }
    }

    completed() {
        if (this._mode !== "completed") {
            this.unselectCurrentButton();
            this._mode = "completed";
            this._view.makeOnlyDoneItemsVisible();
            this.selectCurrentButton();
        }
    }

    active() {
        if (this._mode !== "active") {
            this.unselectCurrentButton();
            this._mode = "active";
            this._view.makeOnlyUndoneItemsVisible();
            this.selectCurrentButton();
        }
    }

    unselectCurrentButton() {
        this._view.unselectButton(this._mode);
    }

    selectCurrentButton() {
        this._view.selectButton(this._mode);
    }
}