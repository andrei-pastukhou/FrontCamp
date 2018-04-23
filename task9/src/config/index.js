export const API = {
    getAllPost: {
        url: `http://localhost:3000/blogs`,
        method: 'GET'
    },
    getOnePost: {
        url: `http://localhost:3000/blogs/:id`,
        method: 'GET'
    },
    addPost: {
        url: `http://localhost:3000/blogs`,
        method: 'POST'
    },
    deletePost: {
        url: `http://localhost:3000/blogs`,
        method: 'DELETE'
    },
    login: {
        url: `http://127.0.0.1:3000/login`,
        method: 'POST',
    },
    register: {
        url: `http://127.0.0.1:3000/Register`,
        method: 'POST',
    },

};

export const config = {
    notAuthMessage: 'Sorry but content avaliable only for authenticated user please'
}
