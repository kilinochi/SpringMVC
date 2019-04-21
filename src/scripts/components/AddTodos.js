var extendConstructor = require('../utils/extendConstructor');
var Eventable = require('../modules/Eventable');

var ENTER_KEY_CODE = 13;

var TODOS_TODO_ADD_SELECTOR = '.todo-add';
var TODOS_TODO_INPUT_SELECTOR = '.todo-add_input';
var TODOS_SELECT_ALL_SELECTOR = '.todo-add_select-all';
var INVALID_INPUT_MODIFICATOR = '__invalid';
var INVALID_INPUT_PLACEHOLDER = 'Enter a todo description!';
var VALID_INPUT_PLACEHOLDER = 'What needs to be done?';

/**
 * @implements {EventListener}
 * @extends {Eventable}
 * @constructor
 */
function AddTodosConstructor() {
    this._todoAdd = document.querySelector(TODOS_TODO_ADD_SELECTOR);
    this._todoInput = document.querySelector(TODOS_TODO_INPUT_SELECTOR);
    this._todoSelectAll = document.querySelector(TODOS_SELECT_ALL_SELECTOR);

    this._todoInput.addEventListener('keypress', this);
    this._todoSelectAll.addEventListener('click', this);

    this._initEventable();
}

extendConstructor(AddTodosConstructor, Eventable);

var addTodosConstructorPrototype = AddTodosConstructor.prototype;

addTodosConstructorPrototype._markAsReadyAll = function () {
    return this.trigger('markAsReadyAll');
};

addTodosConstructorPrototype._addItem = function () {
    var todoInputValue = this._todoInput.value.trim();

    if (todoInputValue.length !== 0) {
        this._todoInput.value = '';
    }

    return this.trigger('newTodo', {
        description: todoInputValue
    });
};

addTodosConstructorPrototype.setInputValid = function (valid) {
    if (valid) {
        this._todoAdd.classList.remove(INVALID_INPUT_MODIFICATOR);
        this._todoInput.setAttribute('placeholder', VALID_INPUT_PLACEHOLDER);
    } else {
        this._todoAdd.classList.add(INVALID_INPUT_MODIFICATOR);
        this._todoInput.setAttribute('placeholder', INVALID_INPUT_PLACEHOLDER);
    }
};

addTodosConstructorPrototype.handleEvent = function (e) {
    this.setInputValid(true);
    switch (e.type) {
        case 'click':
            this._markAsReadyAll();
            break;
        case 'keypress':
            if (e.keyCode === ENTER_KEY_CODE) {
                if (this._todoInput.value) {
                    this._addItem();
                } else {
                    this.setInputValid(false);
                }
            }
            break;
    }
};

module.exports = AddTodosConstructor;