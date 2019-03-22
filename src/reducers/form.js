const initialState = {
    github_id: '',
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type === 'INPUT_CHANGE') {
        newState.github_id = action.value;
    }
    return newState;
}

export default reducer
