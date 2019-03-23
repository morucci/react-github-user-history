import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createMyStore} from './store'
import App from './app'

// Install the app on a github page: https://medium.com/the-andela-way/how-to-deploy-your-react-application-to-github-pages-in-less-than-5-minutes-8c5f665a2d2a
// TODO(fbo): Handle all history pages loading
// TODO(fbo): Add checkbox to select the history type (pushEvent, Comment, ...)

const store = createMyStore()

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);
