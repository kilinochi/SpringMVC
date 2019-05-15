export function sendRequest(r_method, r_path, r_args, r_handler)
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

    var token = document.querySelector("meta[name='_csrf']").getAttribute('content');
    var header = document.querySelector("meta[name='_csrf_header']").getAttribute('content');
    Request.setRequestHeader(header, token);

    if (r_method.toLowerCase() === "post") {
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        Request.send(r_args);
    }
    else {
        Request.send(null);
    }
}