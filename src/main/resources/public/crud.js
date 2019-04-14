function createRequest() {
    var request = false;

    if (window.XMLHttpRequest) {
        //Gecko-совместимые браузеры, Safari, Konqueror
        request = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
        //Internet explorer
        try {
            request = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (CatchException) {
            request = new ActiveXObject("Msxml2.XMLHTTP")
        }
    }

    if (!request) {
        console.log("Невозможно создать XMLHttpRequest!")
    }

    return request
}

function sendPost(path, args, handlerMethod) {
    var request = createRequest();
    if (!request) {
        return
    }
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            console.log("Запрос успешно обработан!");
            if (handlerMethod != null) {
                handlerMethod(request)
            }
        }
    };
    request.open("POST", path, true);
    request.send(args);
}

function onClickCreate() {
    var inputElement = document.getElementsByClassName("todo-creator_text")[0];
    var description = inputElement.value;
    if (description.trim() === "") {
        alert("Task text is empty!");
        return;
    }
    inputElement.value = "";
    var data = new FormData();
    data.append("description", description);
    sendPost("/create", data, addNewTask);
}

function addNewTask(request) {
    var responseData = eval("(" + request.responseText + ")");

    var item = document.getElementsByClassName("todo-list_item template")[0];
    var newItem = item.cloneNode(true);

    newItem.id = responseData.id;
    newItem.getElementsByClassName("todo-list-item_checkbox")[0].checked = responseData.checked;
    newItem.getElementsByClassName("todo-list-item_checkbox")[0].addEventListener('change', function (evt) {
        onCheckedBox(evt.target.parentElement.id)
    });
    newItem.getElementsByClassName("todo-list-item_text")[0].textContent = responseData.description;
    newItem.className = "todo-list_item";
    newItem.getElementsByClassName("todo-list-item_delete")[0].addEventListener('click', function (evt) {
        onClickDelete(evt.target.parentElement.id)
    });

    var parent = document.getElementsByClassName("todo-list")[0];
    parent.appendChild(newItem)
}

function onClickDelete(id) {
    var data = new FormData();
    data.append("id", id);
    var taskToDelete = document.getElementById(id);
    taskToDelete.parentElement.removeChild(taskToDelete);
    sendPost("/delete", data, null)
}

function onCheckedBox(id) {
    console.log("Запрос на изменение состояния чекбокса...");
    var taskToChecked = document.getElementById(id);
    var isChecked = taskToChecked.getElementsByClassName("todo-list-item_checkbox")[0].checked;

    var data = new FormData();
    data.append("id", id);
    data.append("description", taskToChecked.getElementsByClassName("todo-list-item_text")[0].textContent);
    data.append("check", isChecked);
    sendPost("/update", data, function (request) {
        var responseData = eval("(" + request.responseText + ")");
        taskToChecked.getElementsByClassName("todo-list-item_checkbox")[0].checked = responseData.checked;
        console.log("Checked!");
    });
}

function viewAll() {
    console.log("Показываю все задачи...");
    var nodes = document.getElementsByClassName("todo-list_item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        if (item.className === "todo-list_item template") {
            return;
        }
        showItem(item)
    })
}

function viewCheck() {
    console.log("Показываю выполненные задачи...");
    var nodes = document.getElementsByClassName("todo-list_item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        if (item.className === "todo-list_item template") {
            return;
        }
        if (item.getElementsByClassName("todo-list-item_checkbox")[0].checked) {
            showItem(item);
        } else {
            hideItem(item);
        }
    })
}

function viewNotCheck() {
    console.log("Показываю невыполненные задачи...");
    var nodes = document.getElementsByClassName("todo-list_item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        if (item.className === "todo-list_item template") {
            return;
        }
        if (!item.getElementsByClassName("todo-list-item_checkbox")[0].checked) {
            showItem(item);
        } else {
            hideItem(item);
        }
    })
}

function hideItem(item) {
    if (!item.classList.contains("hidden")) {
        item.classList.add("hidden");
    }
}

function showItem(item) {
    if (item.classList.contains("hidden")) {
        item.classList.remove("hidden");
    }
}

