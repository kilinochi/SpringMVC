function request(url, method, body, callback) {
    let connection = new XMLHttpRequest();
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

    connection.send(body);
}