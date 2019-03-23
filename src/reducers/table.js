import { fetchHistory } from './../api'

const initialState = {
    typed_github_id: null,
    history: [],
    error_response: {},
    loading: false
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type === 'FETCH_HISTORY_LOADING') {
        newState.loading = true;
    }
    if (action.type === 'FETCH_HISTORY_SUCCESS') {
        newState.typed_github_id = action.github_id;
        newState.history = action.value;
        newState.error_response = {};
        newState.loading = false;
    }
    if (action.type === 'FETCH_HISTORY_ERROR') {
        newState.typed_github_id = '';
        newState.history = [];
        newState.error_response = action.value;
        newState.loading = false;
    }
    return newState;
}

function fetchHistoryAction(github_id) {
    return (dispatch) => {
        dispatch({type: 'FETCH_HISTORY_LOADING'});
        return fetchHistory(github_id)
            .then(response => {
                dispatch(
                    {
                        type: 'FETCH_HISTORY_SUCCESS',
                        value: response.data,
                        github_id: github_id,
                    }
                )
            })
            .catch(error => {
                dispatch(
                    {
                        type: 'FETCH_HISTORY_ERROR',
                        value: error.response
                    }
                )
            })
    }
}

export default reducer
export {
    fetchHistoryAction
}
