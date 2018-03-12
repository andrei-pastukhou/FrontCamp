const initialState = {
    isLogin: false,
    token: '',
    message: '',
    pending: false,
    username: '',
};
const login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return (
                Object.assign({}, initialState, { isLogin: false, pending: true })
            );
        case 'LOGIN_SUCCSESS':
            return (
                Object.assign({}, initialState, action.data)
            );
        case 'LOGIN_ERROR':
            return (
                Object.assign({}, initialState, action.data)
            );
        case 'LOGOUT':
            return (
                Object.assign({}, initialState));
        default:
            return state
    }
};

export default login
