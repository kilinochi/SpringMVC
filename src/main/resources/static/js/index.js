import {Todos} from "./Todos.js";
import {ToolBar} from "./ToolBar.js";
import {sendRequest} from "./SendXMLRequest.js";

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
    var text = todos.readText();
    var reg = new RegExp('[//<>]');
    if (text.length > 64 || text.match(reg) !== null || text.length <=0){
        alert('Длина заметки не более 64 символов и не используйте /<>');
        return;
    }
    sendRequest('post', '/create',"description=" + encodeURIComponent(text),submitTextRequestHandler);
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
    var text = request.responseText;
    if (text.length === 0){
        alert('Длина заметки не более 64 символов и не используйте /<>');
        return;
    }
    var json = JSON.parse(text);
    todos.addItem(json,removeHandler,checkHandler,textareaResizeHandler);
    toolbar.incrementCounter();
}

