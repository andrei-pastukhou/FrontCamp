const posts = (state = [], action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [
                ...state,
                {
                    id: action.id,
                    author: 1,
                    text: action.text,
                }
            ];
        case 'DELETE_POST':
            return state;
        default:
            return state
    }
};

export default posts