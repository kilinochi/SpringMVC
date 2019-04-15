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
    newItem.className = "todo-list_item";
    newItem.addEventListener('mouseover', function (evt) {
       showButtonDelete(this)
    });
    newItem.addEventListener('mouseout', function (evt) {
       hideButtonDelete(this)
    });

    var checkbox = newItem.getElementsByClassName("todo-list-item_checkbox")[0];
    checkbox.checked = responseData.checked;
    checkbox.addEventListener('change', function (evt) {
        onCheckedBox(evt.target.parentElement.id)
    });

    var inputText = newItem.getElementsByClassName("todo-list-item_text")[0];
    inputText.value = responseData.description;
    inputText.addEventListener('focus', function (evt) {
        showButtonDelete(evt.target.parentElement);
    });
    inputText.addEventListener('blur', function (evt) {
        onChangeDescription(evt.target.parentElement.id)
    });

    var  btnDelete = newItem.getElementsByClassName("todo-list-item_delete")[0];
    btnDelete.addEventListener('click', function (evt) {
        onClickDelete(evt.target.parentElement.id)
    });
    btnDelete.addEventListener('blur', function (evt) {
        hideButtonDelete(evt.target.parentElement)
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
        var task = document.getElementById(responseData.id);
        task.getElementsByClassName("todo-list-item_checkbox")[0].checked = responseData.checked;
        console.log("Checked!");
    });
}

function onChangeDescription(id) {
    var task = document.getElementById(id);
    var data = new FormData();
    data.append("id", id);
    data.append("description", task.getElementsByClassName("todo-list-item_text")[0].value);
    data.append("check", task.getElementsByClassName("todo-list-item_checkbox")[0].checked);
    sendPost("/update", data, function (request) {
        var responseData = eval("(" + request.responseText + ")");
        var changedTask = document.getElementById(responseData.id);
        changedTask.getElementsByClassName("todo-list-item_text")[0].value = responseData.description;
        console.log("Changed!");
    })
}

function showButtonDelete(item) {
    var btnDelete = item.getElementsByClassName("todo-list-item_delete")[0];
    showItem(btnDelete)
}

function hideButtonDelete(item) {
    var btnDelete = item.getElementsByClassName("todo-list-item_delete")[0];
    hideItem(btnDelete, "invisible");
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
            showItem(item, "none");
        } else {
            hideItem(item, "none");
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
            showItem(item, "none");
        } else {
            hideItem(item, "none");
        }
    })
}

function hideItem(item, typeVisibility) {
    if (typeVisibility === "none") {
        if (!item.classList.contains("hidden")) {
            item.classList.add("hidden");
        }
    }
    if (typeVisibility === "invisible"){
        if (!item.classList.contains("invisible")) {
            item.classList.add("invisible");
        }
    } 
}

function showItem(item) {
    if (item.classList.contains("hidden")) {
        item.classList.remove("hidden");
    }
    if (item.classList.contains("invisible")) {
        item.classList.remove("invisible");
    } 
}

