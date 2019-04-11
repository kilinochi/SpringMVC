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

function changeCheckedState(id, taskElement, checkbox) {

    var isChecked = checkbox.checked;

    //К сожалению, я так и не понял, зачем здесь нужно отрицание,
    //но методом проб и ошибок это заработало.
    if (!isChecked) {
        // checkbox.checked = false;
        taskElement.classList.remove("todo-item__checked");
    } else {
        // checkbox.checked = true;
        taskElement.classList.add("todo-item__checked");
    }

    var data = new FormData();
    data.append("id", id);
    data.append("isChecked", isChecked);
    sendPostRequest("/check", data, changeCheckedStateHandler);

}

function changeCheckedStateHandler() {
    //do nothing?
    return;
}

function changeCheckedStateByEvent(mouseEvent) {
    var parent = mouseEvent.target.parentElement.parentElement;
    var id = parent.id;
    changeCheckedState(id, parent, mouseEvent.target);
}

function deletionRequestHandler() {
    //do nothing?
    return;
}

function deleteTaskByEvent(mouseEvent) {
    var id = mouseEvent.target.parentElement.id;
    deleteTaskById(id);
}

function addNewTask(isChecked, description, id) {
    var taskClone = document.querySelector('.template').cloneNode(true);
    taskClone.classList.remove('template');
    taskClone.querySelector('.todo-item__text').textContent = description;
    var checkbox = taskClone.querySelector('.todo-item__checkbox');
    if (isChecked) {
        taskClone.classList.add('todo-item__Checked');
        checkbox.checked = true;
    }
    var button = taskClone.getElementsByClassName('todo-item__button')[0];
    button.onclick = deleteTaskByEvent;
    taskClone.id = id;
    checkbox.onchange = changeCheckedStateByEvent;
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
    if (description.trim() === "") {
        alert("Task text is empty!");
        return;
    }
    inputField.value = "";
    var data = new FormData();
    data.append("description", description);
    sendPostRequest("/create", data, addNewTaskByJson);
}

function filterAll() {
    var nodes = document.querySelectorAll(".todo-item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        if (item.classList.contains("template"))
            return;
        showItem(item);
    })
}

function filterChecked() {
    var nodes = document.querySelectorAll(".todo-item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        if (item.classList.contains("template"))
            return;
        var checkbox = item.querySelector('.todo-item__checkbox');
        if (checkbox.checked) {
            showItem(item);
        } else {
            hideItem(item);
        }
    })
}

function filterUnChecked() {
    var nodes = document.querySelectorAll(".todo-item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        if (item.classList.contains("template"))
            return;
        var checkbox = item.querySelector('.todo-item__checkbox');
        if (!checkbox.checked) {
            showItem(item);
        } else {
            hideItem(item);
        }
    })
}

function hideItem(item) {
    if (!item.classList.contains("hidden")){
        item.classList.add("hidden");
    }
}

function showItem(item) {
    if (item.classList.contains("hidden")){
        item.classList.remove("hidden");
    }
}
