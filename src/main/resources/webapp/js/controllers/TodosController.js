export default class TodosController {
    constructor(model) {
        this.model = model;
    }

    getList = () => this.model.getList();

    getActiveTodos= () => this.model.getActiveTodos();

    addTodo = (text) => {
        this.model.addTodo(text);
    };

    removeTodo = (todo) => {
        this.model.removeTodo(todo);
    };

    editTodo = (todo) => {
        this.model.editTodo(todo);
    };

    clearCompleted = () => {
        this.model.clearCompleted();
    };

    markAllAs = (ready) => {
        this.model.markAllAs(ready);
    };

    stopEditingAllTodos = () => {
        this.model.stopEditingAllTodos();
    };

    countActive = () => {
        return this.model.countActive();
    };
}