const initialState = {
    message: '',
    pending: false,
}
const register = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER':
            return (
                Object.assign({}, state,
                    {
                        pending: true,
                    }
                )
            );
        case 'REGISTER_SUCCSESS':
            return (
                Object.assign({}, state,
                    {
                        pending: false,
                        message: action.message
                    }
                )
            );
        case 'REGISTER_ERROR':
            return (
                Object.assign({}, state,
                    {
                        pending: false,
                        message: action.message
                    }
                )
            );
        default:
            return state
    }
};

export default register
