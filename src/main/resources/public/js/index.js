var all = 4;
var completed = 1;
var mode = 'all';

function removeNode(item) {
    var request = new XMLHttpRequest();
    request.open('DELETE', '/delete?id=' + item.id, true);
    request.addEventListener('readystatechange', function () {
        if ((request.readyState === 4) && (request.status === 200)) {
            item.parentNode.removeChild(item);
            Count();
        }
    });
    request.send();
}

function initialize() {
    document.querySelectorAll('.todos-list_item_remove').forEach(function (value) {
        value.addEventListener(
            'click',
            function () {
                var item = this.closest('.todos-list_item');
                removeNode(item);
            }
        );
    });

    document.querySelectorAll('.todos-list_item_text').forEach(function (value) {
        value.addEventListener('keyup', function () {
            editText(value.closest('.todos-list_item'), value.innerHTML);
        });
    });

    document.querySelectorAll('.custom-checkbox_target').forEach(function (value) {
        value.addEventListener('click', function () {
            var item = value.closest('.todos-list_item');
            if (item.classList.contains('__completed'))
                item.classList.remove('__completed');
            else
                item.classList.add('__completed');
            checkItem(item);
            Count();
        })
    });
}

document.addEventListener("DOMContentLoaded", function () {

    initialize();

    Count(all - completed);
    var todoInput = document.querySelector('.todo-creator_text-input');
    var list = document.querySelector('.todos-list');
    var clear = document.querySelector('.todos-toolbar_clear-completed');
    var buttons = document.querySelector('.filters.todos-toolbar_filters');
    var checkbut = document.querySelector('.todo-creator_check-all');
    var form = document.querySelector('.todo-creator');

    todoInput.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            processingInput();
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    clear.addEventListener('click', function () {
        var checkboxes = list.querySelectorAll('.custom-checkbox_target');
        for (var i = checkboxes.length - 1; i >= 0; i--) {
            var item = checkboxes[i].closest('.todos-list_item');
            if (checkboxes[i].checked) {
                removeNode(item);
            }
        }
        Count();
    });

    buttons.addEventListener('click', function (e) {
        changeMode(e.target.id);
    });

    checkbut.addEventListener('mouseup', function (e) {
        var checkboxes = list.querySelectorAll('.custom-checkbox_target');
        for (var i = 0; i < checkboxes.length; i++) {
            var item = checkboxes[i].closest('.todos-list_item');
            item.classList.add('__completed');
            checkboxes[i].checked = true;
            checkItem(item);
        }
        Count();
    });

    function processingInput() {
        var text = todoInput.value.trim();
        if (text.length !== 0) {
            var request = new XMLHttpRequest();
            request.open('POST', '/create', true);
            request.addEventListener('readystatechange', function () {
                if ((request.readyState === 4) && (request.status === 200)) {
                    add(text, request.responseText);
                    todoInput.value = '';
                }
            });
            var frm = new FormData();
            frm.append('description', text);
            request.send(frm);

        }
    }


});

function editText(item, description) {
    var request = new XMLHttpRequest();
    request.open('POST', '/update', true);
    request.addEventListener('readystatechange', function () {
        if ((request.readyState === 4) && (request.status === 200)) {
            console.log(request.responseText);
        }
    });
    var frm = new FormData();
    frm.append('id', item.id);
    if (description != null) {
        frm.append('description', description);
    }
    frm.append('checked', item.classList.contains('__completed'));
    request.send(frm);
}

function add(text, id) {
    var list = document.querySelector('.todos-list');
    list.insertAdjacentHTML("beforeEnd", resolveTemplate('listItem', {text: text}));
    var removeItems = list.querySelectorAll('.todos-list_item_remove');
    removeItems[removeItems.length - 1].addEventListener(
        'click',
        function () {
            var item = this.closest('.todos-list_item');
            removeNode(item);
            Count();
        }
    );
    var checkItems = list.querySelectorAll('.custom-checkbox_target');
    checkItems[checkItems.length - 1].addEventListener(
        'click',
        function () {
            var item = this.closest('.todos-list_item');
            if (item.classList.contains('__completed'))
                item.classList.remove('__completed');
            else
                item.classList.add('__completed');
            checkItem(item);
            Count();
        }
    );
    var textAreas = list.querySelectorAll('.todos-list_item_text');
    var items = document.querySelectorAll('.todos-list_item');
    items[items.length - 1].id = id;
    textAreas[textAreas.length - 1].addEventListener('keyup', function () {
        editText(items[items.length - 1], textAreas[textAreas.length - 1].innerHTML);
    });

    checkItem(items[items.length - 1]);
    Count();

}

function Count() {
    var board = document.querySelector('.todo-board');
    var list = document.getElementsByClassName('todos-list_item');
    all = list.length;
    completed = 0;
    for (var i = 0; i < all; i++)
        if (list[i].classList.contains('__completed'))
            completed = completed + 1;

    document.querySelector('.todos-toolbar_unready-counter').innerHTML = (all - completed) + ' items left';
    if (all > 0)
        board.classList.add('__has-content');
    else
        board.classList.remove('__has-content');
    updateBoard();
}

function clearButtons() {
    var filters = document.querySelectorAll('.filters-item');
    for (var j = 0; j < filters.length; j++)
        filters[j].classList.remove('__selected');

}

function changeMode(value) {
    if (value !== '') {
        mode = value;
        clearButtons();
        document.getElementById(mode).classList.add('__selected');
        updateBoard();
    }
    var items = document.getElementsByClassName('todos-list_item');
    for (var i = 0; i < items.length; i++) {
        var checkbox = document.getElementsByClassName('custom-checkbox_target')[i];
        switch (mode) {
            case 'active':
                if (checkbox.checked)
                    items[i].classList.add('__hidden');
                else
                    items[i].classList.remove('__hidden');
                break;
            case 'completed':
                if (!checkbox.checked)
                    items[i].classList.add('__hidden');
                else
                    items[i].classList.remove('__hidden');
                break;
            case 'all':
                items[i].classList.remove('__hidden');

        }
    }
}

function updateBoard() {
    var toolbar = document.querySelector('.todos-toolbar');
    if (all > 4 && mode === 'all' || completed > 4 && mode === 'completed' || all - completed > 4 && mode === 'active')
        toolbar.classList.add('__no-border');
    else
        toolbar.classList.remove('__no-border');
}

function resolveTemplate(templateId, templateData) {
    return document.getElementById(templateId).innerHTML.replace(
        /{([^{}]*)}/g,
        function (foundSubstring, dataKey) {

            var result = templateData[dataKey];

            return typeof result === 'string'
            || typeof result === 'number'
                ? result
                : foundSubstring;
        }
    );
}

function checkItem(item) {
    if (item.classList.contains('__completed')) {
        if (mode === 'active')
            item.classList.add('__hidden');
        else if (mode === 'completed')
            item.classList.remove('__hidden');
    } else {
        if (mode === 'active')
            item.classList.remove('__hidden');
        else if (mode === 'completed')
            item.classList.add('__hidden');
    }
    editText(item.closest('.todos-list_item'), null);
}
