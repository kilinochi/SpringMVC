
var div = document.createElement('div');

function getTemplateRootNode(scriptId) {
    var scriptTag = document.getElementById(scriptId);
    div.innerHTML = scriptTag.innerHTML;
    var result = div.children[0];
    div.removeChild(result);
    return result;
}

var templatesEngine = {
    todoItem: function (data) {
        var root = getTemplateRootNode('todoItemTemplate');

        var ready = root.querySelector('.input-checkbox_target');
        var removeAction = root.querySelector('.todo-item_remove');
        var text = root.querySelector('.todo-item_text');

        if (data.description) {
            text.innerText = data.description;
        }

        if (data.ready) {
            ready.checked = true;
        }

        return {
            root: root,
            description: text,
            ready: ready,
            removeAction: removeAction
        };
    }
};

module.exports = templatesEngine;