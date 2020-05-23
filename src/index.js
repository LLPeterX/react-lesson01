import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
//import store from './redux/store';
//import store from './redux/redux-store';
import App from './App';
//import { Provider } from 'react-redux';
//import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
    // <React.StrictMode>
                <App />,
    // </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();