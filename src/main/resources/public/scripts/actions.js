function changeCheckbox(id, tagWrap, tagThis) {
    var stateCheckbox = tagThis.checked;

    if (!stateCheckbox) {
        tagWrap.classList.remove("todos-list_item_1__checked");
    }
    else {
        tagWrap.classList.add("todos-list_item_1__checked");
    }

    var data = new FormData();
    data.append("id", id);
    data.append("stateCheckbox", stateCheckbox);
    createAndSendPostRequest("/changeState", data, function () {
        return 0;
    })

}

function createAndSendPostRequest(url, data, method) {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE && request.status === 200) {
            method(data);
        }
    };

    request.open("POST", url, true);
    request.send(data);
}

function deleteToDo(id) {
    var data = new FormData();
    data.append("id", id);
    createAndSendPostRequest("/delete", data, function () {
        return 0;
    });
    var currentToDo = document.getElementById(id);
    currentToDo.parentElement.removeChild(currentToDo);
}

function addNewToDo(input) {
    var newText = input.value.trim();
    if (newText === "" || newText.length > 100) {
        return;
    }
    input.value = "";
    var data = new FormData();
    data.append("description", newText);
    createAndSendPostRequest("/create", data, handlerAdd);
}

function handlerAdd(data) {
    //var data = JSON.parse(request.responseText);
    //var id = data.get(id);
    var description = data.get("description");
    //var checked = data.checked;

    var newTodo = document.querySelector(".todos-list_item_2").cloneNode(true);
    newTodo.querySelector(".todos-list_item_text").textContent = description;

    var checkbox = newTodo.querySelector("custom-checkbox_target");
    //newTodo.id = Math.random() * (10000 - 100) + 1000;
    newTodo.className = "todos-list_item_1";
    //checkbox.checked = false;
    // if (checked) {
    //     newTodo.classList.add("todos-list_item_1__checked");
    //     checkbox.checked = true;
    // }
    //newTodo.id = id;
    //checkbox.onchange = changeCheckedStateByEvent;
    var parent = document.querySelector(".todos-list_item");
    var id = 0;

    var elem = 1;
    var i = 0;
    while (elem != null) {
        ++i;
        elem = document.getElementById(i);
    }

    // for (var i = 0; i < parent.classList.length; ++i) {
    //     if (parent.classList.item(i).id > id) {
    //         id = parent.classList.item(i).id;
    //     }
    // }
    newTodo.id = i;
    var elemAfter = parent.querySelector(".end-of-item-list");
    parent.insertBefore(newTodo, elemAfter);
}

function clickOnEditButton(ToDoId) {
    var ToDo = document.getElementById(ToDoId);
    var text = ToDo.querySelector(".todos-list_item_text");

    text.contentEditable = "true";
    text.focus();
}

function saveChangingAfterEdit(textTag, ToDoId) {
    textTag.contentEditable = "false";
    var description = textTag.textContent.trim();
    if (description === "" || description.length > 100) {
        return;
    }
    var data = new FormData();
    data.append("id", ToDoId);
    data.append("description", description);
    createAndSendPostRequest("/update", data, function () {
        return 0;
    })
}
