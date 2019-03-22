import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import FormReducer from './reducers/form';
import TableReducer from './reducers/table';

// TODO(fbo): Handle loading
// TODO(fbo): Handle all history pages loading
// TODO(fbo): Add checkbox to select the history type (pushEvent, Comment, ...)

function createMyStore() {

    const rootReducer = combineReducers({
        rForm: FormReducer,
        rTable: TableReducer
    })

    return createStore(
        rootReducer, applyMiddleware(thunk))
}

export {
    createMyStore
}
