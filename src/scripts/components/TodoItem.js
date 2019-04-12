var Eventable = require('../modules/Eventable');
var extendConstructor = require('../utils/extendConstructor');
var templatesEngine = require('../modules/templatesEngine');

var READY_MODIFICATOR = '__ready';
var HIDDEN_MODIFICATOR = '__hide';

/**
 * @param itemData
 * @implements {EventListener}
 * @constructor
 */
function TodoItemConstructor(itemData) {
    this._initEventable();

    var templateResult = templatesEngine.todoItem({
        description: itemData.description
    });

    this._root = templateResult.root;
    this._markReady = templateResult.ready;
    this._removeAction = templateResult.removeAction;
    this._description = templateResult.description;

    this.model = {
        id: itemData.id,
        ready: itemData.ready || false,
        description: itemData.description
    };

    if (itemData.ready) {
        this._setReadyModificator(true);
    }

    this._markReady.addEventListener('change', this);
    this._removeAction.addEventListener('click', this);
    this._description.addEventListener('input', this);
}

extendConstructor(TodoItemConstructor, Eventable);

var todoItemConstructorPrototype = TodoItemConstructor.prototype;

/**
 * @param {HTMLElement} parent
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.render = function (parent) {
    parent.appendChild(this._root);
    return this;
};

/**
 * @param {Event} e
 */
todoItemConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'change':
            this.setReady(this._markReady.checked);
            break;
        case 'click':
            if (e.target === this._removeAction) {
                this.remove();
            }
            break;
        case 'input':
            this.setText(this._description.innerText);
            break;
    }
};

/**
 * @param {String} text
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.setText = function (text) {
    if (this.model.description !== text) {
        this.model.description = text;
        var item = this;
        var req = new XMLHttpRequest();
        req.open("PUT", "/todos/" + this.model.id);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                item.model = JSON.parse(req.responseText);
                item.trigger('change', item.model);
            }
        };
        req.send(JSON.stringify(item.model));
    }
    return this;
};

/**
 * @param {Boolean} ready
 * @return {TodoItemConstructor}
 * @private
 */
todoItemConstructorPrototype._setReadyModificator = function (ready) {
    if (ready) {
        this._root.classList.add(READY_MODIFICATOR);
    } else {
        this._root.classList.remove(READY_MODIFICATOR);
    }
    return this;
};

/**
 * @param {Boolean} ready
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.setReady = function (ready) {
    if (ready !== this.model.ready) {
        this.model.ready = ready;
        var item = this;
        var req = new XMLHttpRequest();
        req.open("PUT", "/todos/" + this.model.id);
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function () {
            if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
                item.model = JSON.parse(req.responseText);
                item._markReady.checked = item.model.ready;
                item._setReadyModificator(item.model.ready);
                item.trigger('change', item.model);
            }
        };
        req.send(JSON.stringify(item.model));
    }
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.remove = function () {
    var item = this;
    var req = new XMLHttpRequest();
    req.open("DELETE", "/todos/" + this.model.id);
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
            item._root.parentNode.removeChild(item._root);
            item.trigger('remove', item.model.id);
        }
    };
    req.send();
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.show = function () {
    this._root.classList.remove(HIDDEN_MODIFICATOR);
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.hide = function () {
    this._root.classList.add(HIDDEN_MODIFICATOR);
    return this;
};

module.exports = TodoItemConstructor;