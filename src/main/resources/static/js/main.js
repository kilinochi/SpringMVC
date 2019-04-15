console.log('init');


document.addEventListener("DOMContentLoaded", function () {
    let input = document.querySelector('.todo-creator_text-input');
    let list = document.querySelector('.todos-list');
    let buttonClear = document.querySelector('.todos-toolbar_clear-completed');
    let filters = document.querySelectorAll('.filters-item');
    var filter = 1;
    let itemsChecked = [];

    let requestRead = new XMLHttpRequest();
    requestRead.onreadystatechange = function () {
        if (requestRead.readyState === XMLHttpRequest.DONE) {
            if (requestRead.status === 200) {
                itemsChecked = JSON.parse(requestRead.responseText);
                redraw();
            }
        }
    };
    requestRead.open("GET", "http://localhost:8080/read", true);
    requestRead.send(null);


    initialization();

    function redraw() {
        var unreadyCounter = 0;
        list.innerHTML = '';
        for (let i = 1; i < 4; i++) {
            document.getElementById("filter" + i).mark = filter === i;
        }

        for (let i = 0; i < itemsChecked.length; i++) {
            if (filter === 1 || filter === 2 && !itemsChecked[i].mark || filter === 3 && itemsChecked[i].mark) {
                addItem(itemsChecked[i].description, itemsChecked[i].mark);
            }
            if (!itemsChecked[i].mark) {
                unreadyCounter++;
            }
        }

        if (unreadyCounter === 0) {
            unreadyCounter = 'none'
        }
        if (unreadyCounter === itemsChecked.length) {
            unreadyCounter = 'All'
        }
        document.querySelector('.todos-toolbar_unready-counter').innerHTML = unreadyCounter + ' items left';
    }


    function initialization() {
        filters[0].addEventListener(
                "click",
                function () {
                    filter = 1;
                    redraw();
                });
        filters[1].addEventListener(
                "click",
                function () {
                    filter = 2;
                    redraw();
                });
        filters[2].addEventListener(
                "click",
                function () {
                    filter = 3;
                    redraw();
                });
        redraw();
    }

    function addItem(description, mark) {
        var s = '';
        if (mark) {
            s = "checked";
        }
        list.insertAdjacentHTML(
                "beforeend",
                ' <div class="todos-list_item">' +
                '<div class="custom-checkbox todos-list_item_ready-marker">' +
                ' <input type="checkbox"' +
                s +
                ' class="custom-checkbox_target" aria-label="Mark todo as ready" />' +
                '<div class="custom-checkbox_visual">' +
                ' <div class="custom-checkbox_visual_icon"></div>' +
                '</div> </div>' +
                ' <button class="todos-list_item_remove" aria-label="Delete todo"></button>\n' +
                '<div class="todos-list_item_text-w">\n' +
                '<textarea readonly class="todos-list_item_text">' +
                description +
                '</textarea> </div> </div>'
        );

        if (mark) {
            let items = list.querySelectorAll('.todos-list_item');
            var textItem = items[items.length - 1].querySelector('.todos-list_item_text');
            textItem.style.color = 'grey';
            textItem.style.textDecoration = 'line-through';
        }

        var removeItems = list.querySelectorAll('.todos-list_item_remove');
        removeItems[removeItems.length - 1].addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    var item = this.closest('.todos-list_item');
                    var textItem = item.querySelector('.todos-list_item_text');
                    removeByText(textItem.value.trim());
                    list.removeChild(item);
                }
        );

        var checkBoxItems = list.querySelectorAll('.custom-checkbox_target');
        checkBoxItems[checkBoxItems.length - 1].addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    let item = this.closest('.todos-list_item');
                    let textItem = item.querySelector('.todos-list_item_text');
                    changeChecked(textItem.value);
                    redraw();
                }
        );
    }

    input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            var description = input.value.trim();
            if (description.length > 0) {
                input.value = "";
                var index = itemsChecked.length;
                itemsChecked[index] = {description: description, mark: false, id: -1};
                addItem(description, false);
                redraw();

                var formData = new FormData();
                formData.append("description", description);
                var requestCreate = new XMLHttpRequest();
                requestCreate.onreadystatechange = function () {
                    if (requestCreate.readyState === XMLHttpRequest.DONE) {
                        if (requestRead.status === 200) {
                            var response = JSON.parse(requestCreate.responseText);
                            console.log(response);
                            itemsChecked[index].id = response.id;
                        }
                    }
                };
                requestCreate.open("POST", "http://localhost:8080/create");
                requestCreate.send(formData);
            }
        }
    });

    function removeByText(s) {
        for (let i = 0; i < itemsChecked.length; i++) {
            if (itemsChecked[i].description === s) {

                var formData = new FormData();
                formData.append("id", itemsChecked[i].id);
                var requestCreate = new XMLHttpRequest();
                requestCreate.open("DELETE", "http://localhost:8080/delete");
                requestCreate.send(formData);
                console.log('remove ' + itemsChecked[i].description + ' id ' + itemsChecked[i].id);

                itemsChecked.splice(i, 1);
                return;
            }
        }
    }

    function changeChecked(s) {
        for (let i = 0; i < itemsChecked.length; i++) {
            if (itemsChecked[i].description === s) {
                itemsChecked[i].mark = !itemsChecked[i].mark;
                var requestCreate = new XMLHttpRequest();
                var formData = new FormData();
                formData.append("id", itemsChecked[i].id);
                formData.append("mark", itemsChecked[i].mark);
                requestCreate.open("PUT", "http://localhost:8080/mark");
                requestCreate.send(formData);

                return itemsChecked[i].mark;
            }
        }
        return true;
    }

    buttonClear.addEventListener(
            "click",
            function (e) {
                e.preventDefault();

                var requestCreate = new XMLHttpRequest();
                requestCreate.open("DELETE", "http://localhost:8080/delete_mark");
                requestCreate.send(null);

                for (let i = 0; i < itemsChecked.length; i++) {
                    if (itemsChecked[i].mark) {
                        itemsChecked.splice(i, 1);
                        i--;
                    }
                }
                redraw();
            }
    )
})
;