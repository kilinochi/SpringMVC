var Eventable = require('../modules/Eventable');
var extendConstructor = require('../utils/extendConstructor');
var papseItem = require('../modules/parseItem');
var meta = require('../modules/meta');

var TodoItem = require('../components/TodoItem');

var TODO_LIST_SELECTOR = '.todo-list';
var TODO_ITEM_SELECTOR = '.todo-item';

/**
 * @extends {Eventable}
 * @constructor
 */
function TodoListConstructor() {
    /**
     * @type {Array.<TodoItemConstructor>}
     * @private
     */
    this._items = [];
    this._todosList = document.querySelector(TODO_LIST_SELECTOR);
    this._currentFilter = 'all';

    document.querySelectorAll(TODO_ITEM_SELECTOR)
        .forEach(this.parseItem, this);

    this._initEventable();
}

extendConstructor(TodoListConstructor, Eventable);

var todoListConstructorPrototype = TodoListConstructor.prototype;

/**
 * @return {Number}
 */
todoListConstructorPrototype.getItemsCount = function () {
    return this._items.length;
};

todoListConstructorPrototype.parseItem = function (root) {
    var node = papseItem(root);
    node.root = root;

    var item = new TodoItem(null, node);
    item.on('change', this._onItemChange, this)
        .on('remove', this._onItemRemove, this);

    this._items.push(item);
};

/**
 * @param {Object} data
 * @param {Function} onError
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.createItem = function (data, onError) {
    var list = this;
    var req = new XMLHttpRequest();
    req.open("POST", "/todos");
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader(meta("_csrf_header"), meta("_csrf"));
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                var response = JSON.parse(req.responseText);
                var item = new TodoItem(response, null);

                list._items.push(item);

                item.on('change', list._onItemChange, list)
                    .on('remove', list._onItemRemove, list)
                    .render(list._todosList);

                list.trigger('itemAdd', item);
            } else if (req.status === 400) {
                onError();
            }
        }
    };
    req.send(JSON.stringify(data));
    return this;
};

/**
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.removeCompletedItems = function () {
    var items = this._items;
    var i = items.length;

    for (; i--;) {
        if (items[i].model.ready) {
            items[i].remove();
        }
    }

    return this;
};

/**
 * @param {Number} itemId
 * @return {TodoItem|null}
 * @private
 */
todoListConstructorPrototype._getItemById = function (itemId) {
    var items = this._items;

    for (var i = items.length; i--;) {
        if (items[i].model.id === itemId) {
            return items[i];
        }
    }

    return null;
};

todoListConstructorPrototype._onItemChange = function (itemModel) {
    this.filterShowedItems(this._currentFilter);
};

todoListConstructorPrototype._onItemRemove = function (itemId) {
    var todoItemComponent = this._getItemById(itemId);

    if (todoItemComponent) {
        todoItemComponent.off('change', this._onItemChange, this);
        todoItemComponent.off('remove', this._onItemRemove, this);
        var todoItemComponentIndex = this._items.indexOf(todoItemComponent);
        this._items.splice(todoItemComponentIndex, 1);
        this.trigger('itemDelete', todoItemComponent.model);
    }

    return this;
};

/**
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.markAsReadyAll = function () {
    this._items.forEach(function (todoItem) {
        todoItem.setReady(true);
    });
    return this;
};

/**
 * @param {String} filterId
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.setFilter = function (filterId) {
    this._currentFilter = filterId;
    return this.filterShowedItems(filterId);
};

/**
 * @param {String} filterId
 * @return {TodoListConstructor}
 */
todoListConstructorPrototype.filterShowedItems = function (filterId) {
    this._items.forEach(function (item) {
        switch (filterId) {
            case 'all':
                item.show();
                break;
            case 'active':
                if (!item.model.ready) {
                    item.show();
                } else {
                    item.hide();
                }
                break;
            case 'completed':
                if (item.model.ready) {
                    item.show();
                } else {
                    item.hide();
                }
                break;
        }
    });
    return this;
};

module.exports = TodoListConstructor;