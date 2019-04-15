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
            method(request);
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