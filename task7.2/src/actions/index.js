import {API} from '../config';
import fetch from 'isomorphic-fetch';

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

//custom code
export const login = (login, password) => {
    return (dispatch) => {
        dispatch({type: 'LOGIN'});
        fetch(API.login.url, {
            method: API.login.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:
            encodeURIComponent('username') + '=' + encodeURIComponent(login) + '&' +
            encodeURIComponent('password') + '=' + encodeURIComponent(password),

        }).then((response) => {
            return response.json();
        })
        .then(data => {
            if (data.status === 'ok') {
                dispatch({type: 'LOGIN_SUCCSESS', token: data.token})
            }else {
                dispatch({type: 'LOGIN_ERROR', message: 'don\'t correct login or password'})
            }
        })
        .catch(errors => dispatch({type: 'LOGIN_ERROR', message: 'Errror with connection to server'}))
    }
};


export const fetchPosts = (token) => {
    return (dispatch) => {
        fetch(API.getAllPost.url, {
            method: API.getAllPost.method,
            headers: {
                'Authorization' : 'bearer ' + token
            }
        }).then((response) => {
            return response.json();
        })
        .then(data => {
             dispatch({type: 'FETCH_POST_SUCCESS', posts: data})
        })
    }
}