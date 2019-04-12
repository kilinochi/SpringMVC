var parseItem = require('./parseItem');

var div = document.createElement('div');

var TEMPLATE_ROOT_NODE = 'todoItemTemplate';

function getTemplateRootNode(nodeId) {
    var nodeTag = document.getElementById(nodeId);
    div.innerHTML = nodeTag.innerHTML;
    var result = div.children[0];
    div.removeChild(result);
    return result;
}

var templatesEngine = {
    todoItem: function (data) {
        var root = getTemplateRootNode(TEMPLATE_ROOT_NODE);
        root.setAttribute('data-id', data.id);

        var item = parseItem(root);

        if (data.description) {
            item.description.innerText = data.description;
        }

        if (data.ready) {
            item.ready.checked = true;
        }

        return {
            root: root,
            description: item.description,
            ready: item.ready,
            removeAction: item.removeAction
        };
    }
};

module.exports = templatesEngine;