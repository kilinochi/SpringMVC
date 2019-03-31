function addTodo(value, id) {
    let newItem = document.createElement('div');
    newItem.classList.add("todos-list_item");
    newItem.setAttribute('id', id);
    newItem.appendChild(new function () {
        let checkBox = document.createElement('div');
        checkBox.classList.add("custom-checkbox");
        checkBox.classList.add("todos-list_item_ready-marker");
        let checkInput = document.createElement('input');
        checkInput.type = "checkbox";
        checkInput.classList.add("custom-checkbox_target");
        checkInput.setAttribute('aria-label', 'Mark todo as ready');

        addCheckInputEL(checkInput);

        let checkBoxVisual = document.createElement('div');
        checkBoxVisual.classList.add("custom-checkbox_visual");
        let checkBoxVisualIcon = document.createElement('div');
        checkBoxVisualIcon.classList.add("custom-checkbox_visual_icon");
        checkBoxVisual.appendChild(checkBoxVisualIcon);
        checkBox.appendChild(checkInput);
        checkBox.appendChild(checkBoxVisual);
        return checkBox;
    });

    newItem.appendChild(new function () {
        let removeButton = document.createElement('button');
        removeButton.classList.add("todos-list_item_remove");
        removeButton.setAttribute('aria-label', 'Delete todo');

        addRemoveBtnEL(removeButton);

        return removeButton;
    });

    newItem.appendChild(new function () {
        let itemText = document.createElement('div');
        itemText.classList.add("todos-list_item_text-w");
        let textArea = document.createElement('textarea');
        textArea.classList.add("todos-list_item_text");
        textArea.value = value;
        itemText.appendChild(textArea);
        return itemText;
    });

    todosList.appendChild(newItem);
}
