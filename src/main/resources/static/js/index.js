"use strict"
//import '../styles/default.css';

//var Eventable = require('./Eventable.js');
function Eventable() {}

var eventablePrototype = Eventable.prototype;

eventablePrototype._initEventable = function () {
    this._eventable_registry = {};
};

function getEventSubscribers(eventable, eventName, needCreate) {
    var registry = eventable._eventable_registry;

    if (eventName in registry) {
        return registry[eventName];
    } else if (needCreate) {
        return registry[eventName] = [];
    }

    return null;
}

eventablePrototype.on = function (eventName, handler, ctx) {
    var subscribers = getEventSubscribers(this, eventName, true);

    subscribers.push({
        handler: handler,
        ctx: ctx
    });

    return this;
};

eventablePrototype.off = function (eventName, handler, ctx) {
    var subscribers = getEventSubscribers(this, eventName);

    if (subscribers) {
        for (var i = subscribers.length; i--;) {
            if (subscribers[i].handler === handler && subscribers[i].ctx === ctx) {
                subscribers.splice(i, 1);
                return this;
            }
        }
    }

    return this;
};

eventablePrototype.trigger = function (eventName, data) {
    var subscribers = getEventSubscribers(this, eventName);

    if (subscribers) {
        var subscribersCopy = subscribers.slice();
        for (var i = 0, l = subscribersCopy.length; i !== l; i += 1) {
            subscribersCopy[i].handler.call(subscribersCopy[i].ctx, data);
        }
    }

    return this;
};

//Основная логика
document.addEventListener("DOMContentLoaded", function () {
    var templates = {
        item: function (data) {
            var item_template = document.getElementById('todos-list-item_template');
            var div_item = document.createElement('div');
            div_item.innerHTML = item_template.innerHTML;
            var txt = div_item.querySelector('.todos-list_item_text');
            var markCompleted = div_item.querySelector('.custom-checkbox_target');

            if(data.text) {
                txt.innerText = data.text;
            }

            if (data.isCompleted) {
                markCompleted.checked = true;
            }

            var deleteLink = div_item.querySelector('.todos-list_item_remove');
            return {
                root: div_item,
                txt: txt,
                markCompleted: markCompleted,
                deleteLink: deleteLink
            };
        }
    };

    //Компонент добавления
    AddComponent.prototype = new Eventable();
    AddComponent.prototype.useCurrentText = function () {
        var text = this._input.value.trim();
        if (text) {
            this._input.value = '';
            this.trigger('add', text);
        }
    };

    AddComponent.prototype.handleEvent = function (e) {
        switch (e.type) {
            case 'keydown':
                if (e.keyCode === 13) {
                    e.preventDefault();
                    this.useCurrentText();
                }
                break;
            case 'click': {
                    e.preventDefault();
                    this.useCurrentText();
                    break;
                }
        }
    };

    function AddComponent(root) {
        this._input = root.querySelector('.todo-creator_text-input');
        this._submit = root.querySelector('.todo-creator_text-input');
        this._input.addEventListener('keydown', this);
        this._submit.addEventListener('click', this);
        this._initEventable();
    }

    //Компонент элементов списка
    function ListItemComponent(text, isCompleted) {
    	var templateResult = templates.item({text: text, isCompleted: isCompleted});
    	this._root = templateResult.root;
    	var checkbox = templateResult.markCompleted;
    	checkbox.addEventListener('change', checkFilters);
    	checkbox.addEventListener('change', renewUnreadyCounter);
    	templateResult.deleteLink.addEventListener('click', this);
    	this._initEventable();
    }

    ListItemComponent.prototype = new Eventable();
    ListItemComponent.prototype.getRoot = function () {
    	return this._root;
    };

    ListItemComponent.prototype.remove = function () {
    	this.trigger('remove', this);
    };

    ListItemComponent.prototype.handleEvent = function () {
    	this.remove();
    };

    //Компонент списка
    function ListComponent(root) {
    	this._root = root;
    	this._items = [];
    	this._initEventable();
    }

    ListComponent.prototype = new Eventable();
    ListComponent.prototype.add = function (text) {
    	var item = new ListItemComponent(text, false);
    	this._items.push(item);
    	this._root.appendChild(item.getRoot());
    	item.on('remove', this._onItemRemove, this);
    	renewUnreadyCounter();
    	checkFilters();
    };

    ListComponent.prototype._onItemRemove = function (item) {
    	var itemIndex = this._items.indexOf(item);
    	if (itemIndex !== -1) {
    		this._root.removeChild(item.getRoot());
    		this._items.splice(itemIndex, 1);
    	}
    	renewUnreadyCounter();
    };

    //Определение текущих компонентов
    var addNode = document.querySelector('.todo-creator');
    var listNode = document.querySelector('.todos-list');
    var add = new AddComponent(addNode);
    var list = new ListComponent(listNode);
    add.on('add', list.add, list);

    var listItems = listNode.getElementsByClassName('todos-list_item');
    var checkboxes = listNode.getElementsByClassName('custom-checkbox_target');

    for(var i = 0; i < listItems.length; i++) {
        var oldText = listItems[i].querySelector('.todos-list_item_text').innerText;
        var oldCheckbox = listItems[i].querySelector('.custom-checkbox_target');
        //var oldItem = new ListItemComponent(oldText, oldCheckbox.checked);
        var oldDelLink = listItems[i].querySelector('.todos-list_item_remove');
        //list._items.push(oldItem);
        oldCheckbox.addEventListener('change', checkFilters);
        oldCheckbox.addEventListener('change', renewUnreadyCounter);
        oldDelLink.addEventListener('click', listItems[i].remove);
        //oldItem.on('remove', list._onItemRemove, list);
    }

    //Поставить галочку на всех элементах
    var checkAll = document.querySelector('.todo-creator_check-all');
    checkAll.addEventListener('click', function(e) {
        e.preventDefault();
        var numOfChecked = 0;
        for(var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked === true) {
                numOfChecked++;
            }
        }
        for(var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = (numOfChecked === checkboxes.length)
            ? false
            : true;
        }
        checkFilters();
        renewUnreadyCounter();
    });

    //Удаление выполненных
    var clearCompleted = document.querySelector('.todos-toolbar_clear-completed');
    clearCompleted.addEventListener('click', function(e) {
        e.preventDefault();
        for(var i = 0; i < checkboxes.length; ) {
            if(checkboxes[i].checked === true) {
                listItems[i].remove();
            } else {
                i++;
            }
        }
        renewUnreadyCounter();
    });

    //Выбор фильтра
    var filters = document.querySelector('.todos-toolbar_filters');
    filters.addEventListener('click', function (e) {
        e.preventDefault();
        var all = filters.querySelector('._all');
        var active = filters.querySelector('._active');
        var complete = filters.querySelector('._complete');

        switch(e.target.className.replace(' __selected', '')) {
            case 'filters-item _all' : {
                active.className = active.className.replace(' __selected', '');
                complete.className = complete.className.replace(' __selected', '');
                e.target.className = 'filters-item _all __selected';
                checkFilters();
                break;
            }
            case 'filters-item _active' : {
                all.className = all.className.replace(' __selected', '');
                complete.className = complete.className.replace(' __selected', '');
                e.target.className = 'filters-item _active __selected';
                checkFilters();
                break;
            }
            case 'filters-item _complete' : {
                all.className = all.className.replace(' __selected', '');
                active.className = active.className.replace(' __selected', '');
                e.target.className = 'filters-item _complete __selected';
                checkFilters();
                break;
            }
        }
    });

    //Отображение элементов соответствующих выбранному фильтру
    function checkFilters() {
        var selected = filters.querySelector('.__selected');
        switch(selected.className.replace(' __selected', '')) {
            case 'filters-item _all' : {
                for (var i = 0; i < listItems.length; i++) {
                    listItems[i].style.display = 'block';
                }
                break;
            }
            case 'filters-item _active' : {
                for (var i = 0; i < listItems.length; i++) {
                    if(checkboxes[i].checked === true) {
                        listItems[i].style.display = 'none';
                    } else {
                        listItems[i].style.display = 'block';
                    }
                }
                break;
            }
            case 'filters-item _complete' : {
                for (var i = 0; i < listItems.length; i++) {
                    if(checkboxes[i].checked === true) {
                        listItems[i].style.display = 'block';
                    } else {
                        listItems[i].style.display = 'none';
                    }
                }
                break;
            }
        }
    }

    //Обновление счетчика невыполненных задач
    function renewUnreadyCounter() {
        var unreadyCounter = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked === false) {
                unreadyCounter++;
            }
        }
        var toolbar_item = document.querySelector('.todos-toolbar_unready-counter');
        toolbar_item.innerText = unreadyCounter + ' items left';
    }

    console.log('init');
});