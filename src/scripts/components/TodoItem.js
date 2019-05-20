var Eventable = require('../modules/Eventable');
var extendConstructor = require('../utils/extendConstructor');
var templatesEngine = require('../modules/templatesEngine');
var meta = require('../modules/meta');

var READY_MODIFICATOR = '__ready';
var HIDDEN_MODIFICATOR = '__hide';

/**
 * @param {Object|null} data
 * @param {Object|null} node
 * @implements {EventListener}
 * @constructor
 */
function TodoItemConstructor(data, node) {
    this._initEventable();

    if (node === null && data === null) {
        console.log('Error: node & data are nulls');
        return;
    }

    if (node === null) { // create from data
        node = templatesEngine.todoItem({
            id: data.id,
            ready: data.ready,
            description: data.description
        });
    }

    if (data === null) { // create from existing div
        data = {
            id: node.root.getAttribute('data-id'),
            ready: node.ready.checked,
            description: node.description.innerHTML
        }
    }

    this._root = node.root;
    this._markReady = node.ready;
    this._removeAction = node.removeAction;
    this._description = node.description;

    this.model = {
        id: data.id,
        ready: data.ready || false,
        description: data.description
    };

    if (data.ready) {
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
        req.setRequestHeader(meta("_csrf_header"), meta("_csrf"));
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
        req.setRequestHeader(meta("_csrf_header"), meta("_csrf"));
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
    req.setRequestHeader(meta("_csrf_header"), meta("_csrf"));
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