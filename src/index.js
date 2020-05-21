import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
//import store from './redux/store';
import store from './redux/redux-store';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// let h1=document.createElement("h1"); // создаем объект-элемент в памяти; пока он не прикреплен в странице
// h1.innerHTML="Hello!"; // внутренний текст - т.е. <h1>Hello!</h1>
// document.querySelector("body").appendChild(h1); // добавляем элемент в конец содержимого <body>


ReactDOM.render(
    // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
    // </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();