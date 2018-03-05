const visibilityFilter = (state = '', action) => {
    switch (action.type) {
        case 'FILTER_POST':
            let newState = state;
            newState = action.author;
            return newState;
        default:
            return state
    }
};

export default visibilityFilter
