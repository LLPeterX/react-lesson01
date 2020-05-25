import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// import store from './redux/redux-store';
// import App from './App';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import SamuraiJSApp from './App'


// ReactDOM.render(
//     <BrowserRouter>
//         <Provider store={store}>
//             <App />
//         </Provider>
//     </BrowserRouter>,
//     document.getElementById('root')
// );
ReactDOM.render(<SamuraiJSApp />, document.getElementById('root')
);

serviceWorker.unregister();