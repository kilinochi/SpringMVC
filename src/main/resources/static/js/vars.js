//api endpoints
const API_CREATE = '/create',
    API_DELETE = '/delete',
    API_UPDATE = '/update';

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
