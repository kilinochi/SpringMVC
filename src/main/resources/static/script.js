function CreateRequest() {
    var Request = false;
    if (window.XMLHttpRequest) Request = new XMLHttpRequest();
    else if (window.ActiveXObject)
    {
        try { Request = new ActiveXObject("Microsoft.XMLHTTP");}
        catch (CatchException) {Request = new ActiveXObject("Msxml2.XMLHTTP");}
    }
    if (!Request) alert("Невозможно создать XMLHttpRequest");
    return Request;
}

function SendRequest(r_method, r_path, r_args, r_handler) {
    var Request = CreateRequest();
    if (!Request) return;
    Request.onreadystatechange = function()
    {
        //Если обмен данными завершен
        if (Request.readyState == 4)
        {
            //Передаем управление обработчику пользователя
            //r_handler(Request);
        }
    }
    //Проверяем, если требуется сделать GET-запрос
    if (r_method.toLowerCase() == "get" && r_args.length > 0)
        r_path += "?" + r_args;
    //Инициализируем соединение
    Request.open(r_method, r_path, true);
    if (r_method.toLowerCase() == "post")
    {
        //Если это POST-запрос
        //Устанавливаем заголовок
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        //Посылаем запрос
        Request.send(r_args);
    }
    else
    {
        //Если это GET-запрос
        //Посылаем нуль-запрос
        Request.send(null);
    }
}
function CreateProdById(str) {
    var data = new FormData();
    data.append("str", str);
    SendRequest("GET","/create", data, creteRequestHandler());
    var prot = document.getElementById(id);
    prot.parentElement.removeChild(prot);
}

function UpdateProdById(id,str) {
    var data = new FormData();
    data.append("id", id);
    SendRequest("GET","/update", data, updateRequestHandler());
    var prot = document.getElementById(id);
    prot.parentElement.removeChild(prot);
}

function NameProdById(id) {
    var data = new FormData();
    data.append("id", id);
    SendRequest("GET","/name", data, nameRequestHandler());
    var prod = document.getElementById(id);
    prod.parentElement.removeChild(prod);
}

function DeleteProdById(id) {
    var data = new FormData();
    data.append("id", id);
    SendRequest("GET","/delete", data, deletionRequestHandler());
    var prod = document.getElementById(id);
    prod.parentElement.removeChild(prod);
}

function listProdById() {
    SendRequest("GET","/list", "", listRequestHandler());
    var prod = document.getElementById(id);
    prod.parentElement.removeChild(prod);
}
function DeleteProd(id) {
    console.log("Delete Prod %d",id);

    var data = new FormData();
    data.append("id", id);
    id="id="+id;
    SendRequest("GET","/delete",id, "");
    location.reload ();
}


function CreateProd() {
    var nodes = document.querySelector(".todo-creator_text-input");
    var str = nodes.value;
    if (str.trim() === "") {alert("Task text is empty!");return;}
    nodes.value = "";
    console.log("Create %s", str);
    str="desc="+str;
    SendRequest("GET","/create",str, "");
    location.reload ();
}

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