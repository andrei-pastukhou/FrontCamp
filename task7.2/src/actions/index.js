let nextTodoId = 0
export const addTodo = text => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

export const setVisibilityFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

//custom code
export const addPost = (text, author) => {
    return {
        type: 'ADD_POST',
        id: nextTodoId++,
        text: text,
        author: author
    }
}

//custom code
export const FilterPost = (author) => {
    return {
        type: 'FILTER_POST',
        author: author,
    }
}