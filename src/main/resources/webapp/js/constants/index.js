const modifiers = { 
    SELECT_FILTER_MODIFIER: '__selected',
    EDIT_TODO_MODIFIER: '__editing',
    COMPLETED_MODIFIER: '__completed',
};

const events = {
    UPDATE_LIST_TODO: 'UPDATE_LIST_TODO',
    NEW_TODO: 'NEW_TODO',
    EDIT_TODO: 'EDIT_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    MARK_ALL_TODO: 'MARK_ALL_TODO',
    STOP_EDITING_ALL_TODO: 'STOP_EDITING_ALL_TODO',
    CLEAR_COMPLETED: 'CLEAR_COMPLETED',
};

const apiUrl = "http://localhost:8080";

export {
    modifiers,
    events,
    apiUrl,
}
