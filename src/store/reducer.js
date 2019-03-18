const initialState = {
    typed_github_id: null,
    github_id: null,
    history: []
};

const reducer = (state = initialState, action) => {
    const newState = {...state};
    if (action.type === 'INPUT_CHANGE') {
        newState.github_id = action.value;
    }
    if (action.type === 'INPUT_SUBMIT') {
        newState.typed_github_id = newState.github_id;
        newState.history = action.value;
    }
    return newState;
}

export default reducer;
