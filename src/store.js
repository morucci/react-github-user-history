import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import FormReducer from './reducers/form';
import TableReducer from './reducers/table';

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
