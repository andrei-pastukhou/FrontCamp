const initialState = {
    isLogin: false,
    token: '',
    message: '',
    pending: false,
    username: '',
}
const login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return (
                Object.assign( {}, state,
                    {
                        isLogin: false,
                        pending: true,
                    }
                )
            );
        case 'LOGIN_SUCCSESS':
            return (
                Object.assign({}, state,
                    {
                        isLogin: true,
                        pending: false,
                        token: action.token,
                        message: '',
                        username: action.username

                    }
                )
            );
        case 'LOGIN_ERROR':
            return (
                Object.assign({}, state,
                    {
                        isLogin: false,
                        pending: false,
                        token: '',
                        message: action.message,
                        username: ''
                    }
                )
            );
        case 'LOGOUT':
            return (
                Object.assign({}, state,
                    {
                        isLogin: false,
                        pending: false,
                        token: '',
                        message: '',
                        username: ''
                    }
                )
            );
        default:
            return state
    }
};

export default login
