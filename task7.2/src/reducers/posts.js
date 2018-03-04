const posts = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POST_PENDING':
            return state;
        case 'FETCH_POST_SUCCESS':
            return action.posts;
        case 'DELETE_POST':
            return state.filter(({ id }) => id !== action.id);
        default:
            return state
    }
};

export default posts