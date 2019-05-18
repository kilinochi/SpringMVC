const token = getMeta("_csrf");
const header = getMeta("_csrf_header");
const badSigns = "@#-+$=*^&%<>";
const goodSigns = [
    ' &commat ',
    ' &#35 ',
    ' &#45 ',
    ' &#43 ',
    ' &#36 ',
    ' &#61 ',
    ' &#42 ',
    ' &#94 ',
    ' &#37 ',
    ' &lt ',
    ' &gt '];


function getMeta(metaName) {
    let metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
        }
    }

    return '';
}

document.addEventListener("DOMContentLoaded", function () {
    let input = document.querySelector('.todo-creator_text-input');
    let list = document.querySelector('.todos-list');
    let buttonClear = document.querySelector('.todos-toolbar_clear-completed');
    let filters = document.querySelectorAll('.filters-item');
    let filter = 1;
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
    requestRead.setRequestHeader(header, token);
    requestRead.send(null);


    initialization();

    function redraw() {
        let unreadyCounter = 0;
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

    String.prototype.replaceAll = function (search, replacement) {
        let target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    // xss protect
    function replaceBadSigns(s) {
        let map = new Map();
        for (let i = 0; i < badSigns.length; i++) {
            map.set(badSigns[i], goodSigns[i]);
        }

        for (let i = 0; i < s.length; i++) {
            if (map.has(s.charAt(i))) {
                s = s.substring(0, i)
                        + map.get(s.charAt(i))
                        + s.substring(i + 1, s.length);
            }
        }

        return s;
    }

    function addItem(description, mark) {
        let markStr = '';
        if (mark) {
            markStr = "checked";
        }

        let text = ' <div class="todos-list_item">' +
                '<div class="custom-checkbox todos-list_item_ready-marker">' +
                ' <input type="checkbox"' +
                markStr +
                ' class="custom-checkbox_target" aria-label="Mark todo as ready" />' +
                '<div class="custom-checkbox_visual">' +
                ' <div class="custom-checkbox_visual_icon"></div>' +
                '</div> </div>' +
                ' <button class="todos-list_item_remove" aria-label="Delete todo"></button>\n' +
                '<div class="todos-list_item_text-w">\n' +
                '<textarea readonly class="todos-list_item_text">' +
                description +
                '</textarea> </div> </div>';

        /*console.log("MY_TEXT1 : " + text);
        text = replaceBadSigns(text);
        console.log("MY_TEXT2 : " + text);*/

        list.insertAdjacentHTML("beforeend", text);

        if (mark) {
            let items = list.querySelectorAll('.todos-list_item');
            let textItem = items[items.length - 1].querySelector('.todos-list_item_text');
            textItem.style.color = 'grey';
            textItem.style.textDecoration = 'line-through';
        }

        let removeItems = list.querySelectorAll('.todos-list_item_remove');
        removeItems[removeItems.length - 1].addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    let item = this.closest('.todos-list_item');
                    let textItem = item.querySelector('.todos-list_item_text');
                    removeByText(textItem.value.trim());
                    list.removeChild(item);
                }
        );

        let checkBoxItems = list.querySelectorAll('.custom-checkbox_target');
        checkBoxItems[checkBoxItems.length - 1].addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    let item = this.closest('.todos-list_item');
                    let textItem = item.querySelector('.todos-list_item_text');
                    changeChecked(textItem.value.trim());
                    redraw();
                }
        );
    }

    function contains(s) {
        for (let i = 0; i < itemsChecked.length; i++) {
            if (itemsChecked[i].description === s) {
                return true;
            }
        }
        return false;
    }

    function isValid(s) {
        if (s.length > 50) {
            return false;
        }

        for (let i = 0; i < badSigns.length; i++) {
            if (s.indexOf(badSigns[i]) > -1) {
                return false;
            }
        }

        return true;
    }

    input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            let description = input.value.trim();
            if (description.length > 0) {
                input.value = "";

                if (contains(description)) {
                    alert("Такой элемент уже существует!");
                    return;
                }

                if (!isValid(description)) {
                    alert("Элемент имеет неверный формат!");
                    return;
                }

                let index = itemsChecked.length;
                itemsChecked[index] = {description: description, mark: false, id: -1};
                addItem(description, false);
                redraw();

                let formData = new FormData();
                formData.append("description", description);
                let requestCreate = new XMLHttpRequest();
                requestCreate.onreadystatechange = function () {
                    if (requestCreate.readyState === XMLHttpRequest.DONE) {
                        if (requestRead.status === 200) {
                            let response = JSON.parse(requestCreate.responseText);
                            console.log(response);
                            itemsChecked[index].id = response.id;
                        }
                    }
                };
                requestCreate.open("POST", "http://localhost:8080/create");
                requestCreate.setRequestHeader(header, token);
                requestCreate.send(formData);
            }
        }
    });

    function removeByText(s) {
        for (let i = 0; i < itemsChecked.length; i++) {
            if (itemsChecked[i].description === s) {
                let formData = new FormData();
                formData.append("id", itemsChecked[i].id);
                let requestRemove = new XMLHttpRequest();
                requestRemove.open("DELETE", "http://localhost:8080/delete");
                requestRemove.setRequestHeader(header, token);
                requestRemove.send(formData);
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
                let requestCheck = new XMLHttpRequest();
                let formData = new FormData();
                formData.append("id", itemsChecked[i].id);
                formData.append("mark", itemsChecked[i].mark);
                requestCheck.open("PUT", "http://localhost:8080/mark");
                requestCheck.setRequestHeader(header, token);
                requestCheck.send(formData);

                return itemsChecked[i].mark;
            }
        }
        return true;
    }

    buttonClear.addEventListener(
            "click",
            function (e) {
                e.preventDefault();

                let requestDeleteAll = new XMLHttpRequest();
                requestDeleteAll.open("DELETE", "http://localhost:8080/delete_mark");
                requestDeleteAll.setRequestHeader(header, token);
                requestDeleteAll.send(null);

                for (let i = 0; i < itemsChecked.length; i++) {
                    if (itemsChecked[i].mark) {
                        itemsChecked.splice(i, 1);
                        i--;
                    }
                }
                redraw();
            }
    )
});