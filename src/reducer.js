import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { fetchHistory } from './api'

function fetchHistoryAction(github_id) {
    return (dispatch) => {
        return fetchHistory(github_id)
            .then(response => {
                dispatch(
                    {
                        type: 'FETCH_HISTORY_SUCCESS',
                        value: response.data
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

const initialState = {
    typed_github_id: null,
    github_id: '',
    history: [],
    error_response: {},
};

// TODO(fbo): Handle loading
// TODO(fbo): Handle all history pages loading
// TODO(fbo): Add checkbox to select the history type (pushEvent, Comment, ...)
// TOOD(fbo): Split reducers between INPUT_TEXT and FETCH_HISTORY
const reducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type === 'INPUT_CHANGE') {
        newState.github_id = action.value;
    }
    if (action.type === 'FETCH_HISTORY_SUCCESS') {
        newState.typed_github_id = newState.github_id;
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

function createMyStore() {
    return createStore(
        reducer, applyMiddleware(thunk))
}

export {
    createMyStore,
    fetchHistoryAction
}
