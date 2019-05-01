document.addEventListener('DOMContentLoaded', function () {
    todosList = document.getElementsByClassName('todos-list')[0];
    todoInputField = document.getElementsByClassName("todo-creator_text-input")[0];
    checkAll = document.getElementsByClassName("todo-creator_check-all")[0];
    taskCounter = document.getElementsByClassName("todos-toolbar_unready-counter")[0];
    allCounter = todosList.childElementCount;
    leftCounter = allCounter - document.getElementsByClassName('__done').length;
    filters = document.getElementsByClassName("filters-item");
    currentFilter = document.getElementsByClassName("filters-item __selected")[0];
    clearCompletedButton = document.getElementsByClassName("todos-toolbar_clear-completed")[0];
    todosToolbar = document.getElementsByClassName("todos-toolbar")[0];

    initTodos();
    showHideToolbar();

    todoInputField.addEventListener('keydown', function (evt) {
        if ((evt.keyCode === 13) && (todoInputField.validity.valid)) {
            evt.preventDefault();
            request(API_CREATE, 'POST', JSON.stringify({
                description: todoInputField.value
            }), function (response) {
                if (response !== null) {
                    addTodo(response.description, response.id);
                    updateListByFilter();
                    changeCounter(1);
                    allCounter += 1;
                    showHideToolbar();
                    todoInputField.value = '';
                }
            });
        }
    });

    checkAll.addEventListener('click', function (evt) {
        evt.preventDefault();
        let todoItems = todosList.children;
        for (let i = 0; i < todoItems.length; i++) {
            if (!todoItems[i].classList.contains('__done')) {
                makeItemDone(todoItems[i]);
            }
        }
        updateListByFilter();
    });

    clearCompletedButton.addEventListener('click', function (evt) {
        clearCompleted();
    });

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener('click', function (evt) {
            currentFilter.classList.remove('__selected');
            currentFilter = evt.target;
            currentFilter.classList.add('__selected');
            updateListByFilter();
        });
    }

});