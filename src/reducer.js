import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {fetchHistory} from './api'

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
                throw (error)
            })
    }
}

const initialState = {
    typed_github_id: null,
    github_id: '',
    history: []
};

const reducer = (state = initialState, action) => {
    const newState = {...state};
    if (action.type === 'INPUT_CHANGE') {
        newState.github_id = action.value;
    }
    if (action.type === 'FETCH_HISTORY_SUCCESS') {
        newState.typed_github_id = newState.github_id;
        newState.history = action.value;
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
