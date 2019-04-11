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
        text: itemData.text
    });

    this._root = templateResult.root;
    this._markReady = templateResult.ready;
    this._removeAction = templateResult.removeAction;
    this._text = templateResult.text;

    this.model = {
        id: itemData.id,
        ready: itemData.ready || false,
        text: itemData.text
    };

    if (itemData.ready) {
        this._setReadyModificator(true);
    }

    this._markReady.addEventListener('change', this);
    this._removeAction.addEventListener('click', this);
    this._text.addEventListener('input', this);
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
            this.setText(this._text.innerText);
            break;
    }
};

/**
 * @param {String} text
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.setText = function (text) {
    if (this.model.text !== text) {
        this._text.innerHTML = text;
        this.model.text = text;
        this.trigger('change', this.model);
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
        this._markReady.checked = ready;
        this.model.ready = ready;
        this._setReadyModificator(ready);
        this.trigger('change', this.model);
    }
    return this;
};

/**
 * @return {TodoItemConstructor}
 */
todoItemConstructorPrototype.remove = function () {
    this._root.parentNode.removeChild(this._root);
    this.trigger('remove', this.model.id);
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