
/**
 * \
 * @param {HTMLDivElement}creator
 * @param {HTMLDivElement}list
 * @param {EventListener}submitTextHandler
 * @param {EventListener}markAllHandler
 * @constructor
 */
function Todos(creator, list, submitTextHandler, markAllHandler) {
    this._creator = creator;
    this._input = creator.querySelector('.todos-creator_text-input');
    this._list = list;
    this._creator.addEventListener('submit',submitTextHandler);
    var markAll = this._creator.querySelector('.todos-creator_check-all');
    markAll.addEventListener('click', markAllHandler);
}

/**
 *
 * @returns {NodeListOf<HTMLElementTagNameMap[[string]]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[[string]]>}
 */
Todos.prototype.getItemList = function(){
    return this._list.querySelectorAll('.todos-list_item');
}
/**
 *
 * @returns {string}
 */
Todos.prototype.readText = function(){
    var text = this._input.value.trim();
    this._input.value = '';
    return text;
}
/**
 *
 * @param {description: string, id: string}data
 * @param {EventListener}removeHandler
 * @param {EventListener}checkHandler
 */
Todos.prototype.addItem = function (data, removeHandler, checkHandler, textareaResizeHandler) {
    var template = templates(data);
    this._list.appendChild(template.item);
    template.removeButton.addEventListener('click', removeHandler);
    template.checkbox.addEventListener('click', checkHandler);
    var textarea = template.item.querySelector('.todos-list_item_text');
    textarea.addEventListener('change', textareaResizeHandler);
}
/**
 *
 * @param {number}id
 */
Todos.prototype.markAsDone = function (id) {
    var itemButton = this._list.querySelector("[id='"+id+"']");
    var item = itemButton.parentNode;
    var check_item_target = item.querySelector('.custom-checkbox_target');
    item.classList.add('__is-checked');
    check_item_target.setAttribute('checked','checked');
}
/**
 *
 * @param {number}id
 */
Todos.prototype.markAsActive = function (id){
    var itemButton = this._list.querySelector("[id='"+id+"']");
    var item = itemButton.parentNode;
    var check_item_target = item.querySelector('.custom-checkbox_target');
    item.classList.remove('__is-checked');
    check_item_target.removeAttribute('checked','checked');
}
/**
 *
 * @param {number}id
 */
Todos.prototype.removeItem = function (id) {
    var itemButton = this._list.querySelector("[id='"+id+"']");
    var item = itemButton.parentNode.parentNode;
    this._list.removeChild(item);
}

Todos.prototype.isChecked = function (id) {
    var itemButton = this._list.querySelector("[id='"+id+"']");
    var item = itemButton.parentNode.parentNode;
    var check_item_target = item.querySelector('.custom-checkbox_target');
    return check_item_target.checked;
}

/**
 *
 * @param {description: string, id: String}data
 * @returns {{item: HTMLDivElement, removeButton: HTMLButtonElement, checkbox: HTMLDivElement}}
 */
function templates(data) {
    var list_item = document.createElement('div');
    list_item.classList.add('todos-list_item');
    var custom_checkbox = document.createElement('div');
    custom_checkbox.classList.add('custom-checkbox');
    custom_checkbox.classList.add('todos-list_item_ready-marker');
    var checkbox_target = document.createElement('input');
    checkbox_target.classList.add('custom-checkbox_target');
    checkbox_target.setAttribute('type', 'checkbox');
    checkbox_target.setAttribute('aria-label', 'Mark todo as ready');
    var checkbox_visual = document.createElement('div');
    checkbox_visual.classList.add('custom-checkbox_visual');
    var checkbox_visual_icon = document.createElement('div');
    checkbox_visual_icon.classList.add('custom-checkbox_visual_icon');
    checkbox_visual.appendChild(checkbox_visual_icon);
    custom_checkbox.appendChild(checkbox_target);
    custom_checkbox.appendChild(checkbox_visual);

    var button_remove = document.createElement('removeButton');
    button_remove.classList.add('todos-list_item_remove');
    button_remove.setAttribute('aria-label', 'Delete todo');
    button_remove.setAttribute('id', data.id);

    var item_text = document.createElement('div');
    item_text.classList.add('todos-list_item_text-w');
    var text = document.createElement('textarea');
    text.classList.add('todos-list_item_text');
    //text.setAttribute('readonly','readonly');
    text.setAttribute('rows', '1');
    text.value = data.description;
    item_text.appendChild(text);

    list_item.appendChild(custom_checkbox);
    list_item.appendChild(button_remove);
    list_item.appendChild(item_text);

    var thymeleafListItem = document.createElement('div');
    thymeleafListItem.classList.add('thymeleafListItem');
    thymeleafListItem.appendChild(list_item);

    return {
        item: thymeleafListItem,
        removeButton: button_remove,
        checkbox: custom_checkbox
    };
}

/**
 *
 * @param {HTMLDivElement}toolbar
 * @param {EventListener}btnAllHandler
 * @param {EventListener}btnActiveHandler
 * @param {EventListener}btnCompletedHandler
 * @param {EventListener}btnClearCompletedHandler
 * @constructor
 */
function ToolBar(toolbar, btnAllHandler, btnActiveHandler, btnCompletedHandler, btnClearCompletedHandler) {
    this._toolbar = toolbar;
    this._counter = toolbar.querySelector('.todos-toolbar_unready-counter-count');
    toolbar.querySelector('.__All').addEventListener('click',btnAllHandler);
    toolbar.querySelector('.__Active').addEventListener('click',btnActiveHandler);
    toolbar.querySelector('.__Completed').addEventListener('click',btnCompletedHandler);
    toolbar.querySelector('.todos-toolbar_clear-completed').addEventListener('click', btnClearCompletedHandler);
}

ToolBar.prototype.incrementCounter = function () {
    var count = parseInt(this._counter.textContent);
    count++;
    this._counter.textContent = count;
}

ToolBar.prototype.decrementCounter = function () {
    var count = parseInt(this._counter.textContent);
    count--;
    this._counter.textContent = count;
}

ToolBar.prototype.allNoSelectedExceptButton = function (button){
    var filters = this._toolbar.querySelectorAll('.todos-toolbar_filter');
    for (var i=0;i<filters.length;i++){
        filters[i].classList.remove('__selected');
    }
    button.classList.add('__selected');
}





/**
 *
 * @param r_method
 * @param {URL}r_path
 * @param {FormData}r_args
 * @param {function}r_handler
 * @constructor
 */
function sendRequest(r_method, r_path, r_args, r_handler)
{
    var Request = new XMLHttpRequest();
    if (!Request) {
        return;
    }
    Request.onreadystatechange = function() {
        if (Request.readyState === 4)
        {
            if (Request.status == 200){
                r_handler(Request);
            }else{
                alert('При отправке запроса на сервер произошла ошибка. Повторите попытку снова.');
            }

        }
    }

    if (r_method.toLowerCase() === "get" && r_args.length > 0)
        r_path += "?" + r_args;

    Request.open(r_method, r_path, true);

    if (r_method.toLowerCase() === "post") {
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        Request.send(r_args);
    }
    else {
        Request.send(null);
    }
}

/**
 *
 * @param {Event}e
 */
function removeHandler(e) {

    var id = this.getAttribute('id');
    sendRequest('post','/remove',"id=" + id,removeRequestHandler);
}
/**
 *
 * @param {Event}e
 */
function checkHandler(e) {

    var item = this.parentNode;
    var id = item.querySelector('.todos-list_item_remove').getAttribute('id');
    var description = item.querySelector('.todos-list_item_text').value;
    var checked = item.querySelector('.custom-checkbox_target').checked;
    var status = checked? "COMPLETED" : "ACTIVE";
    sendRequest('post','/update',"id=" + id + "&description=" + encodeURIComponent(description) + "&status=" + encodeURIComponent(status),checkRequestHandler);
}
/**
 *
 * @param {Event}e
 */
function submitTextHandler(e) {


    e.preventDefault();
    sendRequest('post', '/create',"description=" + encodeURIComponent(todos.readText()),submitTextRequestHandler);
}
/**
 *
 * @param {TextEvent}e
 */
function textareaResizeHandler(e) {

    resizeTextarea(this);
    var item = this.parentNode.parentNode;
    var id = item.querySelector('.todos-list_item_remove').getAttribute('id');
    var description = item.querySelector('.todos-list_item_text').value;
    var checked = item.querySelector('.custom-checkbox_target').checked;
    var status = checked? "COMPLETED" : "ACTIVE";
    /*    var formData = new FormData;
        formData.append("id",id);
        formData.append("description",description);
        formData.append("status",status);*/
    sendRequest('post','/update',"id=" + id + "&description=" + encodeURIComponent(description) + "&status=" + encodeURIComponent(status),checkRequestHandler);
}
/**
 *
 * @param {HTMLTextAreaElement}textarea
 */
function resizeTextarea(textarea) {

    textarea.style.height='auto';
    textarea.style.height=textarea.scrollHeight+'px';
}
/**
 *
 * @param {Event}e
 */
function markAllAsDoneHandler(e) {

    var items = todos.getItemList();
    for(var i=0;i<items.length;i++){
        var check_item_target = items[i].querySelector('.custom-checkbox_target');
        if (!check_item_target.checked){
            var id = items[i].querySelector('.todos-list_item_remove').getAttribute('id');
            todos.markAsDone(id);
            var check_item = items[i].querySelector('.custom-checkbox');
            check_item.dispatchEvent(new Event('click'));
        }
    }
}
/**
 *
 * @param {XMLHttpRequest}request
 */
function removeRequestHandler(request){

    var id = request.responseText;
    if (!todos.isChecked(id)){
        toolbar.decrementCounter();
    }
    todos.removeItem(id);
}
/**
 *
 * @param {XMLHttpRequest}request
 */
function checkRequestHandler(request) {

    var response = request.responseText;
    var json = JSON.parse(request.responseText);
    if (json.status === "COMPLETED"){
        todos.markAsDone(json.id);
        toolbar.decrementCounter();
    }else{
        todos.markAsActive(json.id);
        toolbar.incrementCounter();
    }
}
/**
 *
 * @param {Event}e
 */
function btnAllHandler(e) {

    toolbar.allNoSelectedExceptButton(this);
    var items = todos.getItemList();
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('__is-hidden');
    }
}
/**
 *
 * @param {Event}e
 */
function btnActiveHandler(e) {

    toolbar.allNoSelectedExceptButton(this);
    var items=todos.getItemList();
    for (var i=0;i<items.length;i++){
        var status = items[i].querySelector('.custom-checkbox_target').checked;
        if (status){
            items[i].classList.add('__is-hidden');
        }else{
            items[i].classList.remove('__is-hidden');
        }
    }
}
/**
 *
 * @param {Event}e
 */
function btnCompletedHandler(e){

    toolbar.allNoSelectedExceptButton(this);
    var items=todos.getItemList();
    for (var i=0;i<items.length;i++){
        var status = items[i].querySelector('.custom-checkbox_target').checked;
        if (!status){
            items[i].classList.add('__is-hidden');
        }else{
            items[i].classList.remove('__is-hidden');
        }
    }
}
/**
 *
 * @param {Event}e
 */
function btnClearCompletedHandler(e) {

    var items=todos.getItemList();
    for (var i=0;i<items.length;i++){
        var status = items[i].querySelector('.custom-checkbox_target').checked;
        if (status){
            var removeBtn = items[i].querySelector('.todos-list_item_remove');
            removeBtn.dispatchEvent(new Event('click'));
        }
    }
}
/**
 *
 * @param {XMLHttpRequest}request
 */
function submitTextRequestHandler(request) {

    var json = JSON.parse(request.responseText);
    todos.addItem(json,removeHandler,checkHandler,textareaResizeHandler);
    toolbar.incrementCounter();
}
var removeButtons = document.querySelectorAll('.todos-list_item_remove');
var checkButtons = document.querySelectorAll('.custom-checkbox');
var textareas = document.querySelectorAll('.todos-list_item_text');
removeButtons.forEach(function (value) {

    value.addEventListener('click',removeHandler);
});
checkButtons.forEach(function (value) {

    value.addEventListener('click', checkHandler);
});
textareas.forEach(function (textarea) {

    textarea.addEventListener('change', textareaResizeHandler);
    resizeTextarea(textarea);
});

var todos = new Todos(document.querySelector('.todos-creator')
        ,document.querySelector('.todos-list')
        ,submitTextHandler
        ,markAllAsDoneHandler);

var toolbar = new ToolBar(document.querySelector('.todos-toolbar')
        ,btnAllHandler
        ,btnActiveHandler
        ,btnCompletedHandler
        ,btnClearCompletedHandler);
