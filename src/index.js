import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createMyStore} from './store'
import App from './app'

const store = createMyStore()

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);
