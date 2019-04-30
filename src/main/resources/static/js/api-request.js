function request(url, method, body, callback) {
    let connection = new XMLHttpRequest();
    let elementToken = document.querySelector('meta[name="_csrf"]');
    let token = elementToken && elementToken.getAttribute("content");
    let elementHeader = document.querySelector('meta[name="_csrf_header"]');
    let header = elementHeader && elementHeader.getAttribute("content");
    console.log(elementToken);
    console.log(token);
    console.log(elementHeader);
    console.log(header);

    connection.open(method, url, true);

    connection.onload = function (onloadEvent) {
        if (connection.status !== 200) {
            console.error("Something went wrong");
        } else {
            if (connection.responseText !== "") {
                let response = JSON.parse(connection.responseText);
                callback(response);
            } else {
                callback(null);
            }
        }
    };

    connection.timeout = REQUEST_TIMEOUT;

    connection.ontimeout = function (ontimeoutEvent) {
        console.error("Connection timed out");
    };

    connection.setRequestHeader(header, token);

    connection.send(body);
}