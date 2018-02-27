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
        case 'DELETE_POST':
            return state.filter(({ id }) => id !== action.id);
        default:
            return state
    }
};

export default posts