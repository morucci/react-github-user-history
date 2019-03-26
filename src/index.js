import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createMyStore} from './store'
import App from './app'

// TODO(fbo): Handle all history pages loading
// TODO(fbo): Add checkbox to select the history type (pushEvent, Comment, ...)

const store = createMyStore()

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);
