function ShowAll() {
    var nodes = document.querySelectorAll(".todos-list_item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        console.log("Show All");
        item.style.display = '';
    })
}

function ShowOnBox() {
    var nodes = document.querySelectorAll(".todos-list_item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        var checkbox = item.querySelector('.custom-checkbox_target_t');
        if (!checkbox.checked) {
            console.log("ShowOnBox on");
            item.style.display = '';
        } else {
            console.log("ShowOnBox off");
            item.style.display = 'none';
        }
    })
}

function ShowOffBox() {
    var nodes = document.querySelectorAll(".todos-list_item");
    var items = Array.from(nodes);
    items.forEach(function (item) {
        console.log("ShowOnBox 1");
        var checkbox = item.querySelector('.custom-checkbox_target_t');
        if (checkbox.checked) {
            console.log("ShowOnBox off");
            item.style.display = '';
        } else {
            console.log("ShowOnBox on");
            item.style.display = 'none';
        }
    })
}

function OffBox() {
    var items = Array.from(document.querySelectorAll(".todos-list_item"));
    items.forEach(function (item) {
        var checkbox = item.querySelector('.custom-checkbox_target_t');
        if (checkbox.checked) {
            console.log("OffCheckBox");
            checkbox.checked=false;
        }
    })
}