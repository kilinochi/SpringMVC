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
        if (Request.readyState == 4) r_handler(Request);
    }
    if (r_method.toLowerCase() == "get" && r_args.length > 0) r_path += "?" + r_args;
    Request.open(r_method, r_path, true);
    if (r_method.toLowerCase() == "post")
    {
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        Request.send(r_args);
    }
    else Request.send(null);
}

function ListProd() {
    SendRequest("GET","/list", "",ListRequest);
}

function ListRequest(request) {
    return;
}

function DeleteProd(id){
    var desc =  document.getElementById(id);
    console.log("Delete Prod %d",id);
    var resultActionUser = confirm("Delete Product "+desc.title+"?");
    if (!resultActionUser) return;
    var data = new FormData();
    data.append("id", id);
    id="id="+id;
    SendRequest("GET","/delete",id,DeleteRequest);
}

function DeleteRequest(request) {
    var responseData = eval("(" + request.responseText + ")");
    var id = responseData.id;
    var prod = document.getElementById(id);
    prod.parentElement.removeChild(prod);
}

function GetProd(id) {
    console.log("GetProd %s", id);
    id="id="+id;
    SendRequest("GET","/name",id,GetRequest);
}

function GetRequest(request) {
    var responseData = eval("(" + request.responseText + ")");
    var id = responseData.id;
    var name = responseData.description;
    alert("Product id:"+id+"\nProduct name:"+name);
}

function CreateProd() {
    var nodes = document.querySelector(".todo-creator_text-input");
    var str = nodes.value;
    if (str.trim() === "") {alert("Task text is empty!");return;}
    nodes.value = "";
    console.log("Create %s", str);
    str="desc="+str;
    SendRequest("GET","/create",str, DefRequest);
    location.reload ();
}
function UpdateProd(id) {
    var elem = document.getElementById(id).querySelector('.custom-checkbox_target_t');
    var hidden = elem.checked;
    var query="id="+id+"&hidden="+hidden;
    console.log("UpdateProd "+query);
    SendRequest("GET","/update",query,DefRequest);
}

function UpdateRequest(request) {
    var responseData = eval("(" + request.responseText + ")");
    var id = responseData.id;
    var name = responseData.description;
    var hidden = responseData.hidden;
}

function DefRequest(request) {
    return;
}

function ShowAll() {
    var items = Array.from(document.querySelectorAll(".todos-list_item"));
    items.forEach(function (item) {
        console.log("Show All");
        item.style.display = '';
    })
}

function ShowOnBox() {
    var items = Array.from(document.querySelectorAll(".todos-list_item"));
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
    var items = Array.from(document.querySelectorAll(".todos-list_item"));
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
            UpdateProd(item.id);
        }
    })
}
