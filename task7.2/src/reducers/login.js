const initialState = {
    isLogin: false,
    token: '',
    message: '',
    pending: false,
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
                        message: ''
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
                        message: 'error according to login server'
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
                        message: ''
                    }
                )
            );
        default:
            return state
    }
};

export default login