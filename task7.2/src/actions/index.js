let newId = 0;

//custom code
export const addPost = (text, author) => {
    return {
        type: 'ADD_POST',
        id: newId++,
        text: text,
        author: author
    }
};

export const deletePost = (id) => {
    return {
        type: 'DELETE_POST',
        id: id
    }
};

//custom code
export const FilterPost = (author) => {
    return {
        type: 'FILTER_POST',
        author: author,
    }
};