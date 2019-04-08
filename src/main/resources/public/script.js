function createRequest() {
    var request = false;

    if (window.XMLHttpRequest) {
        //Gecko-совместимые браузеры, Safari, Konqueror
        request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //Internet explorer
        try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (CatchException) {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!request) {
        alert("Невозможно создать XMLHttpRequest");
    }

    return request;
}

function sendPostRequest(path, args, handlerMethod) {
    var request = createRequest();
    if (!request) {
        return;
    }

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                handlerMethod(request);
            } else {
                alert("Ошибка при обработке запроса")
            }
        } else {
            //загрузка
        }
    };

    request.open("POST", path, true);
    // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    request.send(args);
}

function addNewTaskByJson(request) {
    var responseData = eval("(" + request.responseText + ")");
    var isSelected = responseData.checked;
    var description = responseData.description;
    var id = responseData.id;

    addNewTask(isSelected, description, id);
}

function deleteTaskById(id) {
    var data = new FormData();
    data.append("id", id);
    sendPostRequest("/delete", data, deletionRequestHandler());
    var taskToDelete = document.getElementById(id);
    taskToDelete.parentElement.removeChild(taskToDelete);
}

function changeSelectedState(id, taskElement, checkbox){

    var isChecked = !checkbox.checked;

    if (isChecked){
        // checkbox.checked = false;
        taskElement.classList.remove("todo-item__selected");
    } else {
        // checkbox.checked = true;
        taskElement.classList.add("todo-item__selected");
    }
}

function changeSelectedStateByEvent(mouseEvent) {
    var parent = mouseEvent.target.parentElement.parentElement;
    var id = parent.id;
    changeSelectedState(id, parent, mouseEvent.target);
}

function deletionRequestHandler() {
    //do nothing?
    return;
}

function deleteTaskByEvent(mouseEvent) {
    var id = mouseEvent.target.parentElement.id;
    deleteTaskById(id);
}

function addNewTask(isSelected, description, id) {
    var taskClone = document.querySelector('.template').cloneNode(true);
    taskClone.classList.remove('template');
    taskClone.querySelector('.todo-item__text').textContent = description;
    var checkbox = taskClone.querySelector('.todo-item__checkbox');
    if (isSelected) {
        taskClone.classList.add('todo-item__selected');
        checkbox.checked = true;
    }
    var button = taskClone.getElementsByClassName('todo-item__button')[0];
    button.onclick = deleteTaskByEvent;
    taskClone.id = id;
    checkbox.onchange = changeSelectedStateByEvent;
    var parent = document.querySelector('.todo-list > ul');
    var beforeElement = document.querySelector('.todo-list__emptyFiller');
    parent.insertBefore(taskClone, beforeElement);
}

function initDeleteEvent(element) {
    element.onclick = deleteTaskByEvent;
}

function handleAddButtonClick() {
    var inputField = document.querySelector('.todo-creator__input');
    var description = inputField.value;
    if (description.trim() === ""){
        alert("Task text is empty!1!");
        return;
    }
    inputField.value = "";
    var data = new FormData();
    data.append("description", description);
    sendPostRequest("/create", data, addNewTaskByJson);
}