var extendConstructor = require('../utils/extendConstructor');
var getTextNode = require('../utils/getTextNode');
var Eventable = require('../modules/Eventable');
var Filter = require('../components/Filter');

var ACTION_BAR_QUERY_SELECTOR = '.todos-action-bar_counter';
var CLEAR_COMPLETED_QUERY_SELECTOR = '.todos-action-bar_clear-completed';
var FILTERS_QUERY_SELECTOR = '.todos-filters';

/**
 * @constructor
 * @implements {EventListener}
 */
function TodoActionsBarConstructor() {
    this._initEventable();

    this._counterNode = document.querySelector(ACTION_BAR_QUERY_SELECTOR);
    this._counterNodeText = getTextNode(this._counterNode);

    this._clearCompletedNode = document.querySelector(CLEAR_COMPLETED_QUERY_SELECTOR);
    this._clearCompletedNode.addEventListener('click', this);

    this._filters = new Filter(document.querySelector(FILTERS_QUERY_SELECTOR));
    this._filters.on('filterSelected', this._onFilterSelected, this);
}

extendConstructor(TodoActionsBarConstructor, Eventable);

var todoActionsBarConstructorPrototype = TodoActionsBarConstructor.prototype;

todoActionsBarConstructorPrototype._onFilterSelected = function (filterId) {
    this.trigger('filterSelected', filterId);
};

/**
 * @return {TodoActionsBarConstructor}
 * @private
 */
todoActionsBarConstructorPrototype._clearCompleted = function () {
    this.trigger('clearCompleted');
    return this;
};

/**
 * @param {Number} count
 * @return {TodoActionsBarConstructor}
 */
todoActionsBarConstructorPrototype.setItemsCount = function (count) {
    this._counterNodeText.nodeValue = count + ' items';
    return this;
};

/**
 * @param {Event} e
 */
todoActionsBarConstructorPrototype.handleEvent = function (e) {
    switch (e.type) {
        case 'click':
            this._clearCompleted();
            break;
    }
};

module.exports = TodoActionsBarConstructor;