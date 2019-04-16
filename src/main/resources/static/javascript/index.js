var todoBoard = document.querySelector('.todo-board');
var todoCreator = document.querySelector('.todo-creator');
var todoList = document.querySelector('.todo-list');
var clearCompleted = document.querySelector('.todo-toolbar_clear-completed');
var filters = document.querySelector('.todo-toolbar_filters');
var checkAll = document.querySelector('.todo-creator_check-all');
var counter = document.querySelector('.todo-toolbar_unready-counter');
var active = 0;
var all = 0;

function sendAjax(type, path, args, responseHandler){
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
        if(todo.isDone){
            custom_checkbox_target.setAttribute('checked','checked');
        }
        todo_list_item_ready_marker.appendChild(custom_checkbox_target);

    var custom_checkbox_visual = document.createElement('div');
        custom_checkbox_visual.className = "custom-checkbox_visual";
        todo_list_item_ready_marker.appendChild(custom_checkbox_visual);

    var todo_list_item_text = document.createElement('textarea');
        todo_list_item_text.className = "todo-list_item_text";
        todo_list_item_text.value = todo.description;
        if(todo.isDone){
            todo_list_item_text.style.textDecoration = "line-through";
        }else{
            active++;
        }
        todo_list_item_text_w.appendChild(todo_list_item_text);

    var custom_checkbox_visual_icon = document.createElement('div');
        custom_checkbox_visual_icon.className = "custom-checkbox_visual_icon";
        custom_checkbox_visual.appendChild(custom_checkbox_visual_icon);

    return todo_list_item;
}

function handleDelete(response){
    var todoItem = document.getElementById(response);
    todoList.removeChild(todoItem);
    var check = todoItem.querySelector('.custom-checkbox_target');
    if(!check.checked){
        counter.textContent = --active + ' items left';
    }
    all--;
    if(all == 0){
        todoBoard.classList.add('__without-content');
    }
}

function handleUpdate(response){
    var todoItem = document.getElementById(response.id);
    var todoText = todoItem.querySelector('.todo-list_item_text');
    if(response.isDone){
        todoText.style.textDecoration = "line-through";
        active--;
    }else{
        todoText.style.textDecoration = "none";
        active++;
    }
    counter.textContent = active+ ' items left';
}

var basePath = "todo/";
function handleCreate(response){
    todoBoard.classList.remove('__without-content');
    var todoItem = getTodoItemHTML(response);
    todoItem.addEventListener('change',function(){
        var todoText = todoItem.querySelector('.todo-list_item_text');
        var todoReady = todoItem.querySelector('.custom-checkbox_target');
        sendAjax('PUT', basePath + "update/" + todoItem.id, JSON.stringify({id: todoItem.id, description: todoText.value, isDone: todoReady.checked}), handleUpdate);
    });
    todoItem.querySelector('.todo-list_item_remove').addEventListener('click',function(e){
        sendAjax('DELETE', basePath + "delete/" + todoItem.id, null, handleDelete);
    });
    todoList.appendChild(todoItem);
    counter.textContent = active + ' items left';
    all++
}

todoCreator.addEventListener('submit', function (e) {
    var todoInput = todoCreator.querySelector('.todo-creator_text-input');
    var todoInputText = todoInput.value;
    sendAjax('POST', basePath + 'create', todoInputText, handleCreate);;
    todoInput.value = '';
    e.preventDefault();
});

function handleReadAll(response){
    response.forEach(function(todo){
        handleCreate(todo);
        all++;
    });
    counter.textContent = active+ ' items left';
}

function handleDeleteCompleted(response){
    var allChecked = todoList.querySelectorAll('input:checked');
    allChecked.forEach(function(todo){
        todo.parentNode.parentNode.remove();
        all--
    });
    if(all == 0){
        todoBoard.classList.add('__without-content');
    }
}

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

checkAll.addEventListener('mouseup', function(){
    var all = todoList.querySelectorAll('.todo-list_item');
    all.forEach(function(todo){
        var check = todo.querySelector('.custom-checkbox_target');
        var todoText = todo.querySelector('.todo-list_item_text');
        if(!check.checked){
            check.checked = true;
            sendAjax('PUT', basePath + "update/" + todo.id, JSON.stringify({id: todo.id, description: todoText.value, isDone: true}), handleUpdate);
        }
    });
    counter.textContent = active + ' items left';
})

var todoItems = todoList.querySelectorAll('.todo-list_item');
todoItems.forEach(function(todoItem){
    todoItem.addEventListener('change',function(){
        var todoText = todoItem.querySelector('.todo-list_item_text');
        var todoReady = todoItem.querySelector('.custom-checkbox_target');
        sendAjax('PUT', basePath + "update/" + todoItem.id, JSON.stringify({id: todoItem.id, description: todoText.value, isDone: todoReady.checked}), handleUpdate);
    });
    todoItem.querySelector('.todo-list_item_remove').addEventListener('click',function(e){
        sendAjax('DELETE', basePath + "delete/" + todoItem.id, null, handleDelete);
    });
})

//sendAjax('GET', basePath + "readAll", null, handleReadAll);