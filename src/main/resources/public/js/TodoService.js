export function request(method, url, handle) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText) {
                console.log('responseText:' + xhr.responseText);
                try {
                    var data = JSON.parse(xhr.responseText);
                } catch (err) {
                    console.log(err.message + " in " + xhr.responseText);
                    return;
                }
            }
            handle(data);
        }
    };

    xhr.open(method, url, true);

    var token = document.querySelector("meta[name='_csrf']").getAttribute('content');
    var header = document.querySelector("meta[name='_csrf_header']").getAttribute('content');
    xhr.setRequestHeader(header, token);

    xhr.send();
}