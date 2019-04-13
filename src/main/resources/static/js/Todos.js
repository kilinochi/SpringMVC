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