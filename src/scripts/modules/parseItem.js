var READY_QUERY_SELECTOR = '.input-checkbox_target';
var REMOVE_QUERY_SELECTOR = '.todo-item_remove';
var TEXT_QUERY_SELECTOR = '.todo-item_text';

var parseItem = function (root) {
    var ready = root.querySelector(READY_QUERY_SELECTOR);
    var description = root.querySelector(TEXT_QUERY_SELECTOR);
    var removeAction = root.querySelector(REMOVE_QUERY_SELECTOR);

    return {
        ready: ready,
        description: description,
        removeAction: removeAction
    }
};

module.exports = parseItem;