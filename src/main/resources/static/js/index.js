function ToDoManager(root) {
    this._listItem = document.querySelector('.todo-list');
    this._creator = document.querySelector('.todo-creator');
    this._tools = document.querySelector('.todo-toolbar');
    this._count = document.querySelector('.todo-toolbar_unready-counter');
}

ToDoManager.prototype.setFiltersHandler = function(all,active,completed,clear){
  this._tools.querySelector('.__All').addEventListener('click',all);
  this._tools.querySelector('.__Active').addEventListener('click',active);
  this._tools.querySelector('.__Completed').addEventListener('click',completed);
  this._tools.querySelector('.todo-toolbar_clear-completed').addEventListener('click',clear);
};

ToDoManager.prototype.incrementCount = function(){
    var count = parseInt(this._count.textContent);
    count++;
    this._count.textContent = count + ' item left';
};

ToDoManager.prototype.decrementCount = function(){
    var count = parseInt(this._count.textContent);
    count--;
    this._count.textContent = count + ' item left';
};
ToDoManager.prototype.getListItem = function () {
    return this._listItem.querySelectorAll('.todo-list_item');
};

ToDoManager.prototype.getDescription = function () {
    return this._creator.querySelector('.todo-creator_text-input').value.trim();
};

ToDoManager.prototype.setSubmitHandler = function (handler) {
    this._creator.addEventListener('submit', handler);
};

ToDoManager.prototype.setMarkAllHandler = function (handler) {
    this._creator.querySelector('.todo-creator_check_all').addEventListener('click', handler);
};

ToDoManager.prototype.createItem = function (data, handlerRemove, handlerCheck, handlerResizeText) {
    var item = template(data);
    item.removeButton.addEventListener('click', handlerRemove);
    item.checkboxButton.addEventListener('click', handlerCheck);
    item.todo_list_item.querySelector('.todo-list_item-text').addEventListener('change', handlerResizeText);
    this._listItem.appendChild(item.todo_list_item);
};

ToDoManager.prototype.deleteItem = function (item) {
    this._listItem.removeChild(item);
};

ToDoManager.prototype.getItem = function (id) {
    var items = this._listItem.querySelectorAll('.todo-list_item');
    var item;
    items.forEach(function (value) {
        var itemId = value.querySelector('.todo-list_item-remove').getAttribute('id');
        if (itemId === id) {
            item = value;
        }
    });
    return item;
};

ToDoManager.prototype.markAsCompleted = function (item) {
    var check_item_target = item.querySelector('.custom-checkbox_target');
    check_item_target.setAttribute('checked','checked');
    item.classList.add('__is-checked');
}

ToDoManager.prototype.markAsActive = function (item) {
    var check_item_target = item.querySelector('.custom-checkbox_target');
    check_item_target.removeAttribute('checked');
    item.classList.remove('__is-checked');
};

ToDoManager.prototype._allNoSelected = function (button) {
    var filters = this._tools.querySelectorAll('.todo-toolbar_filter');
    for (var i=0;i<filters.length;i++){
        filters[i].classList.remove('__selected');
    }
    button.classList.add('__selected');
};

ToDoManager.prototype.completed = function (button) {
    this._allNoSelected(button);
    var items=this.getListItem();
    for (var i=0;i<items.length;i++){
        var state = items[i].querySelector('.custom-checkbox_target').checked;
        if (!state){
            items[i].classList.add('__not-active');
        }else{
            items[i].classList.remove('__not-active');
        }
    }
};

ToDoManager.prototype.active = function (button) {
    this._allNoSelected(button);
    var items=this.getListItem();
    for (var i=0;i<items.length;i++){
        var state = items[i].querySelector('.custom-checkbox_target').checked;
        if (state){
            items[i].classList.add('__not-active');
        }else{
            items[i].classList.remove('__not-active');
        }
    }
};

ToDoManager.prototype.all = function (button) {
    this._allNoSelected(button);
    var items=this.getListItem();
    for (var i=0;i<items.length;i++){
        items[i].classList.remove('__not-active');
    }
};

ToDoManager.prototype.clear = function () {
    var items=this.getListItem();
    for (var i=0;i<items.length;i++){
        var state = items[i].querySelector('.custom-checkbox_target').checked;
        if (state){
            this.deleteItem(items[i]);
        }
    }
};

function template(data) {
    var todo_list_item = document.createElement('div');
    todo_list_item.classList.add('todo-list_item');
    var custom_checkbox = document.createElement('div');
    custom_checkbox.classList.add('custom-checkbox');
    custom_checkbox.classList.add('todo-list_item_ready-marker');
    var custom_checkbox_target = document.createElement('input');
    custom_checkbox_target.classList.add('custom-checkbox_target');
    custom_checkbox_target.setAttribute('type', 'checkbox');
    custom_checkbox_target.setAttribute('aria-label', 'Mark todo as ready');
    var custom_checkbox_visual = document.createElement('div');
    custom_checkbox_visual.classList.add('custom-checkbox_visual');
    var checkbox_visual_icon = document.createElement('div');
    checkbox_visual_icon.classList.add('custom-checkbox_visual-icon');
    custom_checkbox_visual.appendChild(checkbox_visual_icon);
    custom_checkbox.appendChild(custom_checkbox_target);
    custom_checkbox.appendChild(custom_checkbox_visual);
    var button_remove = document.createElement('button');
    button_remove.classList.add('todo-list_item-remove');
    button_remove.setAttribute('aria-label', 'Delete todo');
    button_remove.setAttribute('id', data.id);
    var item_text = document.createElement('div');
    item_text.classList.add('todo-list_item-text-w');
    var textArea = document.createElement('textarea');
    textArea.classList.add('todo-list_item-text');
    textArea.setAttribute('rows', '1');
    textArea.value = data.description;
    item_text.appendChild(textArea);
    todo_list_item.appendChild(custom_checkbox);
    todo_list_item.appendChild(button_remove);
    todo_list_item.appendChild(item_text);

    return {
        todo_list_item: todo_list_item,
        removeButton: button_remove,
        checkboxButton: custom_checkbox
    };
}

function sendRequest(method, path, args, handler)
{
    var Request = new XMLHttpRequest();
    if (!Request) {
        return;
    }
    Request.onreadystatechange = function() {
        if (Request.readyState === 4)
        {
            if (Request.status == 200){
                handler(Request);
            }else{
                alert('error');
            }

        }
    };
    if (method.toLowerCase() === "get" && args.length > 0)
        path += "?" + args;
    Request.open(method, path, true);
    var token = document.querySelector("meta[name='_csrf']").getAttribute('content');
    var header = document.querySelector("meta[name='_csrf_header']").getAttribute('content');
    Request.setRequestHeader(header, token);

    if (method.toLowerCase() === "post") {
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        Request.send(args);
    }
    else {
        Request.send(null);
    }
}

function deleteHandler(e) {
    var id = this.getAttribute('id');
    sendRequest('post','/delete',"id=" + id,deleteRequestHandler);
}

function deleteRequestHandler(request){
    var id = request.responseText;
    if (id!=="Id is not found") {
        toDoManager.deleteItem(toDoManager.getItem(id));
        toDoManager.decrementCount();
    }
}
function checkHandler(e) {
    var item = this.parentNode;
    var id = item.querySelector('.todo-list_item-remove').getAttribute('id');
    var description = item.querySelector('.todo-list_item-text').value;
    var checked = item.querySelector('.custom-checkbox_target').checked;
    var state = checked ? "COMPLETED" : "ACTIVE";
    sendRequest('post','/update',"id=" + id + "&description=" + encodeURIComponent(description) + "&state=" + encodeURIComponent(state),checkRequestHandler);
}

function checkRequestHandler(request) {
    var response = request.responseText;
    if (response != null) {
        var toDoObj = JSON.parse(request.responseText);
        if (toDoObj.state === "COMPLETED"){
            toDoManager.markAsCompleted(toDoManager.getItem(toDoObj.id));
            toDoManager.decrementCount();
        }else{
            toDoManager.markAsActive(toDoManager.getItem(toDoObj.id));
            toDoManager.incrementCount();
        }
    } else {
        alert("Can't update, check rule for description");
        return;
    }
}

function submitTextHandler(e) {
    e.preventDefault();
    var text=toDoManager.getDescription();
    if ((text.length > 34) || (text.length == 0)) {
        alert("Can't create. Minimal length is 1, maximal length is 34");
        return;
    }
    sendRequest('post', '/create',"description=" + encodeURIComponent(text),submitTextRequestHandler);
}
function submitTextRequestHandler(request) {
    var response = request.responseText;
    if (response != null) {
        var toDoObj = JSON.parse(request.responseText);
        toDoManager.createItem(toDoObj,deleteHandler,checkHandler,textareaResizeHandler);
        toDoManager.incrementCount();
    } else {
        alert("Can't create, check rule for description");
        return;
    }

}

function textareaResizeHandler(e) {
    resizeTextarea(this);
    var item = this.parentNode.parentNode;
    var id = item.querySelector('.todo-list_item-remove').getAttribute('id');
    var description = item.querySelector('.todo-list_item-text').value;
    var checked = item.querySelector('.custom-checkbox_target').checked;
    var state = checked? "COMPLETED" : "ACTIVE";
    if ((description.length > 34) || (description.length == 0)) {
        alert("Can't update. Minimal length is 1, maximal length is 34");
        return;
    }
    sendRequest('post','/update',"id=" + id + "&description=" + encodeURIComponent(description) + "&state=" + encodeURIComponent(state),checkRequestHandler);
}

function resizeTextarea(textarea) {
    textarea.style.height='auto';
    textarea.style.height=textarea.scrollHeight+'px';
}

function markAllCompletedHandler(e) {
    var items = toDoManager.getListItem();
    for(var i=0;i<items.length;i++){
        var check_item_target = items[i].querySelector('.custom-checkbox_target');
        if (!check_item_target.checked){
            var id = items[i].querySelector('.todo-list_item-remove').getAttribute('id');
            toDoManager.markAsCompleted(toDoManager.getItem(id));
            var check_item = items[i].querySelector('.custom-checkbox');
            check_item.dispatchEvent(new Event('click'));
        }
    }
}

function buttonAllHandler(e) {
    toDoManager.all(this);
}

function buttonActiveHandler(e) {
    toDoManager.active(this);
}

function buttonCompletedHandler(e){
    toDoManager.completed(this);
}

function buttonClearCompletedHandler(e) {
    toDoManager.clear();
}

var toDoManager=new ToDoManager(document.querySelector('.todo-board'));
toDoManager.setMarkAllHandler(markAllCompletedHandler);
toDoManager.setSubmitHandler(submitTextHandler);
toDoManager.setFiltersHandler(buttonAllHandler,buttonActiveHandler,buttonCompletedHandler,buttonClearCompletedHandler);
var buttons = document.querySelectorAll('.todo-list_item-remove');
buttons.forEach(function (value) {
    value.addEventListener('click', deleteHandler);
})
var checkboxs = document.querySelectorAll('.custom-checkbox');
checkboxs.forEach(function (value) {
    value.addEventListener('click', checkHandler);
})
var textareas = document.querySelectorAll('.todo-list_item-text');
textareas.forEach(function (value) {
    value.addEventListener('change',textareaResizeHandler);
    resizeTextarea(value);
})