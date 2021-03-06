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
        url: `http://localhost:3000/login`,
        method: 'POST',
    },
    register: {
        url: `http://localhost:3000/Register`,
        method: 'POST',
    },
    postHeader: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

};

export const config = {
    notAuthMessage: 'Sorry but content avaliable only for authenticated user please'
}
