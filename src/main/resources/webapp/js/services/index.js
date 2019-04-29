import { apiUrl } from '../constants';

function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
        }
    }

    return '';
}

function checkStatus(res) {
    if (res.ok) {
        return res.text();
    }
    return res.json().then((json) => {
        throw Error(json.message);
    });
}

function parseJSON(text) {
    return text ? JSON.parse(text) : {}
}

function wrapFetch(url, options, contentType = 'application/json; charset=utf-8') {
    const headers = {};
    const csrfToken = getMeta("_csrf");
    const csrfHeader = getMeta("_csrf_header");
    headers[csrfHeader] = csrfToken;
    if (contentType !== null) {
        headers['Content-Type'] = contentType;
        headers.Accept = contentType;
    }
    return fetch(url, {
        headers,
        ...options,
    }).then(checkStatus)
      .then(parseJSON)
      .catch(msg => alert(msg));
}

function getTodos() {
    return wrapFetch(`${apiUrl}/todo`, {
        method: 'GET',
    });
}

function addTodo(text) {
    return wrapFetch(`${apiUrl}/todo/add`,{
        method: 'POST',
        body: text,
    });
}

function editTodo(todo) {
    return wrapFetch(`${apiUrl}/todo/update`, {
        method: 'PUT',
        body: JSON.stringify(todo),
    });
}

function removeTodo(todo) {
    return wrapFetch(`${apiUrl}/todo/delete/${todo.id}`, {
        method: 'DELETE',
    });
}

function markAllAs(ready) {
    return wrapFetch(`${apiUrl}/todo/mark?ready=${ready}`, {
        method: 'PUT',
    });
}

function clearCompleted() {
    return wrapFetch(`${apiUrl}/todo/delete-completed`, {
        method: 'DELETE',
    });
}

function countActive() {
    return wrapFetch(`${apiUrl}/todo/active`, {
        method: 'GET',
    });
}

const todosService = {
    getTodos,
    addTodo,
    editTodo,
    removeTodo,
    markAllAs,
    clearCompleted,
    countActive,
};

export default todosService;