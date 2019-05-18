var todoBoard = document.querySelector('.todo-board');
var todoCreator = document.querySelector('.todo-creator');
var todoList = document.querySelector('.todo-list');
var todoItems = todoList.querySelectorAll('.todo-list_item');
var clearCompleted = document.querySelector('.todo-toolbar_clear-completed');
var filters = document.querySelector('.todo-toolbar_filters');
var checkAll = document.querySelector('.todo-creator_check-all');
var counter = document.querySelector('.todo-toolbar_unready-counter-number');
var left = +counter.textContent;
var basePath = "todo/";

function sendAjax(type, path, args, responseHandler){
    var token = document.querySelector('meta[name="_csrf"]').getAttribute('content');
    var header = document.querySelector('meta[name="_csrf_header"]').getAttribute("content");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        var DONE = 4;
        var OK = 200;
        if (xhr.readyState == DONE) {
            if (xhr.status == OK) {
                responseHandler(JSON.parse(xhr.responseText));
            } else {
                console.log('Error: ' + xhr.status);
            }
        }
    }
    xhr.open(type, path);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(header, token);
    xhr.send(args);
}

function getTodoItemHTML(todo){
    var todo_list_item = document.createElement('div');
    todo_list_item.className = "todo-list_item";
    todo_list_item.setAttribute('id', todo.id);

    var todo_list_item_ready_marker = document.createElement('div');
    todo_list_item_ready_marker.classList.add("todo-list_item_ready-marker");
    todo_list_item_ready_marker.classList.add('custom-checkbox');
    todo_list_item.appendChild(todo_list_item_ready_marker);

    var todo_list_item_remove = document.createElement('button');
    todo_list_item_remove.className = "todo-list_item_remove";
    todo_list_item_remove.setAttribute('aria-label', 'Delete todo');
    todo_list_item.appendChild(todo_list_item_remove);

    var todo_list_item_text_w = document.createElement('div');
    todo_list_item_text_w.className = "todo-list_item_text-w";
    todo_list_item.appendChild(todo_list_item_text_w);

    var custom_checkbox_target = document.createElement('input');
        custom_checkbox_target.className = "custom-checkbox_target";
        custom_checkbox_target.setAttribute('type','checkbox');
        custom_checkbox_target.setAttribute('aria-label','Mark todo as ready');
        todo_list_item_ready_marker.appendChild(custom_checkbox_target);

    var custom_checkbox_visual = document.createElement('div');
        custom_checkbox_visual.className = "custom-checkbox_visual";
        todo_list_item_ready_marker.appendChild(custom_checkbox_visual);

    var todo_list_item_text = document.createElement('textarea');
        todo_list_item_text.className = "todo-list_item_text";
        todo_list_item_text.value = todo.description;
        todo_list_item_text_w.appendChild(todo_list_item_text);

    var custom_checkbox_visual_icon = document.createElement('div');
        custom_checkbox_visual_icon.className = "custom-checkbox_visual_icon";
        custom_checkbox_visual.appendChild(custom_checkbox_visual_icon);

    return todo_list_item;
}

function handleDelete(response){
    var todoItem = document.getElementById(response);
    var check = todoItem.querySelector('.custom-checkbox_target');
    if(!check.checked){
        counter.textContent = --left;
    }
    todoList.removeChild(todoItem);
}

function handleUpdateCheckbox(response){
    var todoItem = document.getElementById(response.id);
    var todoText = todoItem.querySelector('.todo-list_item_text');
    if(response.isDone){
        todoText.style.textDecoration = "line-through";
        counter.textContent = --left;
    }else{
        todoText.style.textDecoration = "none";
        counter.textContent = ++left;
    }
}

function addUpdateDeleteListeners(todoItem){
    var todoText = todoItem.querySelector('.todo-list_item_text');
    var todoReady = todoItem.querySelector('.custom-checkbox_target');
    todoItem.querySelector('.todo-list_item_ready-marker').addEventListener('change', function(){
        sendAjax('PUT', basePath + "update/" + todoItem.id, JSON.stringify({id: todoItem.id, description: todoText.value, isDone: todoReady.checked}), handleUpdateCheckbox);
    });
    todoItem.querySelector('.todo-list_item_text-w').addEventListener('change', function(){
        if(!todoText.value == "") {
            todoItem.querySelector('.todo-error-label').style.display = "none";
            sendAjax('PUT', basePath + "update/" + todoItem.id, JSON.stringify({id: todoItem.id, description: todoText.value, isDone: todoReady.checked}), null);
        } else {
            todoItem.querySelector('.todo-error-label').style.display = "block";
        }
    });
    todoItem.querySelector('.todo-list_item_remove').addEventListener('click', function(e){
        sendAjax('DELETE', basePath + "delete/" + todoItem.id, null, handleDelete);
    });
}

function handleCreate(response){
    var todoItem = getTodoItemHTML(response);
    addUpdateDeleteListeners(todoItem);
    todoList.appendChild(todoItem);
    counter.textContent = ++left;
}

function handleDeleteCompleted(response){
    var allChecked = todoList.querySelectorAll('input:checked');
    allChecked.forEach(function(todo){
        todo.parentNode.parentNode.remove();
    });
}

todoCreator.addEventListener('submit', function (e) {
    e.preventDefault();
    var todoInput = todoCreator.querySelector('.todo-creator_text-input');
    var todoInputText = todoInput.value;
    if(!todoInputText == "") {
        sendAjax('POST', basePath + 'create', todoInputText, handleCreate);
        todoBoard.querySelector('.creator-error').style.display = "none";
    } else {
        todoBoard.querySelector('.creator-error').style.display = "block";
    }
    todoInput.value = '';
});

clearCompleted.addEventListener('click', function(e){
    sendAjax('DELETE', basePath + "delete", null, handleDeleteCompleted);
});

filters.querySelector('.all').addEventListener('click', function(e){
    filters.querySelectorAll('.filters_item').forEach(function(filter){
        filter.classList.remove('__selected');
    });
    e.target.classList.add('__selected');
    var all = todoList.querySelectorAll('.todo-list_item');
    all.forEach(function(todo){
        todo.style.display = "block";
    });
});

filters.querySelector('.completed').addEventListener('click', function(e){
    filters.querySelectorAll('.filters_item').forEach(function(filter){
        filter.classList.remove('__selected');
    });
    e.target.classList.add('__selected');
    var all = todoList.querySelectorAll('.todo-list_item');
    all.forEach(function(todo){
        var check = todo.querySelector('.custom-checkbox_target');
        if(check.checked){
            todo.style.display = "block";
        }else{
            todo.style.display = "none";
        }
    });
});

filters.querySelector('.active').addEventListener('click', function(e){
    filters.querySelectorAll('.filters_item').forEach(function(filter){
        filter.classList.remove('__selected');
    });
    e.target.classList.add('__selected');
    var all = todoList.querySelectorAll('.todo-list_item');
    all.forEach(function(todo){
        var check = todo.querySelector('.custom-checkbox_target');
        if(check.checked){
            todo.style.display = "none";
        }else{
            todo.style.display = "block";
        }
    });
});

checkAll.addEventListener('click', function(){
    var all = todoList.querySelectorAll('.todo-list_item');
    all.forEach(function(todo){
        var check = todo.querySelector('.custom-checkbox_target');
        var todoText = todo.querySelector('.todo-list_item_text');
        if(!check.checked){
            check.checked = true;
            sendAjax('PUT', basePath + "update/" + todo.id, JSON.stringify({id: todo.id, description: todoText.value, isDone: true}), handleUpdateCheckbox);
        }
    });
})

todoItems.forEach(function(todoItem){
    addUpdateDeleteListeners(todoItem);
})
