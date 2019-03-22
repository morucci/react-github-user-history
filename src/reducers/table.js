import { fetchHistory } from './../api'

const initialState = {
    typed_github_id: null,
    history: [],
    error_response: {},
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type === 'FETCH_HISTORY_SUCCESS') {
        newState.typed_github_id = action.github_id;
        newState.history = action.value;
        newState.error_response = {};
    }
    if (action.type === 'FETCH_HISTORY_ERROR') {
        newState.typed_github_id = '';
        newState.history = [];
        newState.error_response = action.value;
    }
    return newState;
}

function fetchHistoryAction(github_id) {
    return (dispatch) => {
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
                console.log(error.response)
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
