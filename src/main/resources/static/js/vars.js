//api endpoints
const API = '/api',
    API_VERSION = '/v1',
    API_CREATE = API + API_VERSION + '/create',
    API_DELETE = API + API_VERSION + '/delete',
    API_UPDATE = API + API_VERSION + '/update';

//vars
var todosList,
    todoInputField,
    checkAll,
    taskCounter,
    allCounter,
    leftCounter,
    filters,
    currentFilter,
    clearCompletedButton,
    todosToolbar;

//timeout for request to server
const REQUEST_TIMEOUT = 5000;
