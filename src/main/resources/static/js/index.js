'use strict';

var xhr = new XMLHttpRequest();

function getResponse(url, method) {
    xhr.open(method, url, false);
    xhr.send();
    if (xhr.status !== 200) {
        console.error('Error:', xhr.status);
        return null;
    } else {
        return JSON.parse(xhr.responseText);
    }
}

var itemTemplate = '<div class="todos-list_item">'
                    + '<div class="custom-checkbox todos-list_item_ready-marker">'
                        + '<input type="checkbox" class="custom-checkbox_target todos-list_item_checkbox"'
                               + ' aria-label="Mark todo as ready" />'
                        + '<div class="custom-checkbox_visual%VISUAL%">'
                            + '<div class="custom-checkbox_visual_icon%VISUAL_ICON%"></div>'
                        + '</div>'
                    + '</div>'
                    + '<button class="todos-list_item_remove" aria-label="Delete todo"></button>'
                    + '<div class="todos-list_item_text-w">'
                        + '<textarea class="todos-list_item_text%ITEM_TEXT%" rows="1" readonly>%DESCRIPTION%</textarea>'
                    + '</div>'
                + '</div>';

var idList = [];

var funcList = [];

var checkedList = [];

var selectedFilter = 'all';

var itemCount;

function counter(num) {
    var number = num;
    itemsLeft();

    function itemsLeft() {
        var unreadyCounter = document.getElementsByClassName('todos-toolbar_unready-counter')[0];
        unreadyCounter.innerText = (7 - number) + ' items left';
    }

    return {
        add: function () {
            number++;
            itemsLeft();
        },
        sub: function() {
            number--;
            itemsLeft();
        }
    }
}

function onClickAddButton() {
    var textInput = document.getElementsByClassName('todo-creator_text-input')[0];
    if (!textInput.value) {
        console.warn('Empty textInput');
        return null;
    }
    var items = document.getElementsByClassName('todos-list_item');
    if (items.length >= 7) {
        console.warn('Free space is over');
        textInput.value = '';
        return null;
    }
    var response = getResponse('/add?description=' + textInput.value, 'POST');
    textInput.value = '';
    if (response && selectedFilter !== 'completed') {
        idList[idList.length] = response.id;
        var list = document.getElementsByClassName('todos-list')[0];
        if (list) {
            list.appendChild(getItem(response.id, response.description, response.checked));
        } else {
            list = document.createElement('div');
            list.setAttribute('class', 'todos-list');
            list.appendChild(getItem(response.id, response.description, response.checked));
            var creator = document.getElementsByClassName('todo-creator')[0];
            creator.after(list);
        }
    }
    itemCount.add();
}

function getItem(id, description, checked) {
    var item = itemTemplate;
    item = item.replace(/%VISUAL%/, checked ? '_check' : '');
    item = item.replace(/%VISUAL_ICON%/, checked ? '_check' : '');
    item = item.replace(/%ITEM_TEXT%/, checked ? ' __checked' : '');
    item = item.replace(/%DESCRIPTION%/, description);
    var htmlItem = document.createElement('div');
    htmlItem.innerHTML = item;
    funcList[idList.indexOf(id)] = {
        changeFunc: onChangeChecked(id),
        deleteFunc: onClickDelete(id)
    };
    var checkbox = htmlItem.getElementsByClassName('custom-checkbox_target')[0];
    checkbox.addEventListener('change', funcList[idList.indexOf(id)].changeFunc);
    var deleteButton = htmlItem.getElementsByClassName('todos-list_item_remove')[0];
    deleteButton.addEventListener('click', funcList[idList.indexOf(id)].deleteFunc);
    return htmlItem.firstChild;
}

function onChangeChecked(i) {
    var id = i;
    return function () {
        var response = getResponse('/changeChecked?id=' + id, 'PUT');
        var checkedItem = document.getElementsByClassName('todos-list_item')[idList.indexOf(response.id)];
        if (checkedList.indexOf(response.id) === -1) {
            checkedList.push(response.id);

        }

        if (selectedFilter === 'all') {
            checkedItem.replaceWith(getItem(response.id, response.description, response.checked));
        } else {
            checkedItem.remove();
            funcList.splice(idList.indexOf(response.id), 1);
            idList.splice(idList.indexOf(response.id), 1);
        }
    }
}

function onClickDelete(i) {
    var id = i;

    return function () {
        var response = getResponse('/delete?id=' + id, 'DELETE');
        var index = idList.indexOf(response.id);
        deleteEventListeners();
        if (checkedList.indexOf(response.id) !== -1) {
            checkedList.splice(checkedList.indexOf(response.id), 1);
        }
        var deletedItem = document.getElementsByClassName('todos-list_item')[index];
        deletedItem.remove();
        itemCount.sub();
        setEventListeners(true);
    }
}

function onClickClearCompleted() {
    var response = getResponse('/clearCompleted', 'DELETE');
    idList = [];
    checkedList = [];
    refreshList(response);
    itemCount = counter(response.length);
}

function onClickFilter(filter, num) {
    function getClass(bNum) {
        return bNum === num ? 'filters-item __selected' : 'filters-item';
    }

    if (selectedFilter === filter) {
        return null;
    }
    selectedFilter = filter;
    var filterButtons = document.getElementsByClassName('filters-item');
    filterButtons[0].setAttribute('class', getClass(0));
    filterButtons[1].setAttribute('class', getClass(1));
    filterButtons[2].setAttribute('class', getClass(2));
    var response = getResponse('/getList', 'GET');
    idList = [];
    refreshList(response);
}

function refreshList(items) {
    var list = document.getElementsByClassName('todos-list')[0];
    while (list.hasChildNodes()) {
        list.firstChild.remove();
    }

    var i = 0;
    items.forEach(function (item) {
        switch (selectedFilter) {
        case 'active':
            if (!item.checked) {
                idList[i++] = item.id;
                list.appendChild(getItem(item.id, item.description, item.checked));
            }
            break;
        case 'completed':
            if (item.checked) {
                idList[i++] = item.id;
                list.appendChild(getItem(item.id, item.description, item.checked));
            }
            break;
        default:
            idList[i++] = item.id;
            list.appendChild(getItem(item.id, item.description, item.checked));
        }
    });
}

function deleteEventListeners() {
    var checkboxes = document.getElementsByClassName('custom-checkbox_target');
    var deleteButtons = document.getElementsByClassName('todos-list_item_remove');
    for (var i = 0, j = 0; i < checkboxes.length; i++, j++) {
        var index;
        while (idList.indexOf(j) === -1 && j < 10) {
            j++;
        }
        index = idList.indexOf(j);
        checkboxes[i].removeEventListener('change', funcList[index].changeFunc);
        deleteButtons[i].removeEventListener('click', funcList[index].deleteFunc);
    }
    funcList = [];
    idList = [];
}

function setEventListeners() {
    var checkboxes = document.getElementsByClassName('custom-checkbox_target');
    var deleteButtons = document.getElementsByClassName('todos-list_item_remove');
    for (var i = 0, id = 0; i < checkboxes.length; i++, id++) {
        switch (selectedFilter) {
        case 'active':
            while (checkedList.indexOf(id) !== -1) {
                id++;
            }
            break;
        case 'completed':
            while (checkedList.indexOf(id) === -1) {
                id++;
            }
            break;
        default:
            break;
        }
        idList[i] = id;
        funcList[i] = {
            changeFunc: onChangeChecked(id),
            deleteFunc: onClickDelete(id)
        };
        checkboxes[i].addEventListener('change', funcList[i].changeFunc);
        deleteButtons[i].addEventListener('click', funcList[i].deleteFunc);
    }

    return checkboxes.length;
}

// -------------------Constructor-------------------
function constructor() {
    document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            onClickAddButton();
        }
    });

    var addButton = document.getElementsByClassName('todo-creator_add_button')[0];
    addButton.addEventListener('click', onClickAddButton);
    itemCount = counter(setEventListeners());
    var clearCompletedButton = document.getElementsByClassName('todos-toolbar_clear-completed')[0];
    clearCompletedButton.addEventListener('click', onClickClearCompleted);
    var filterButtons = document.getElementsByClassName('filters-item');
    filterButtons[0].addEventListener('click', function () {
        onClickFilter('all', 0);
    });
    filterButtons[1].addEventListener('click', function () {
        onClickFilter('active', 1);
    });
    filterButtons[2].addEventListener('click', function () {
        onClickFilter('completed', 2);
    });
    onClickFilter('all', 0);
}

window.onload = constructor;