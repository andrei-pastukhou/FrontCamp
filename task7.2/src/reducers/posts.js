const posts = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [
                ...state,
                {
                    id: action.id,
                    author: action.author,
                    text: action.text,
                }
            ];
        case 'FETCH_POST_SUCCESS':
            console.log(action)
            return action.posts;
        case 'DELETE_POST':
            return state.filter(({ id }) => id !== action.id);
        default:
            return state
    }
};

export default posts