import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';

import { Route } from 'react-router-dom';
import { withRouter, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer.ts';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import { HashRouter } from 'react-router-dom';
import store from './redux/redux-store';
import withLazyLoading from './hoc/withLazyLoading'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer.tsx'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {

    // arrow func - чтобы сохранился контекст this
    catchAllUnhandledErrors = (promiseRejectionEvent) => {
        // alert('Error occured: '+promiseRejectionEvent.reason);
        console.error(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection");
    }

    render() {

        if (!this.props.isIntialized) return <Preloader />
        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <NavBar />
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path="/profile/:userId?" render={withLazyLoading(ProfileContainer)} />
                        <Route path="/dialogs" render={withLazyLoading(DialogsContainer)} />
                        <Route path="/users" render={withLazyLoading(UsersContainer)} />
                        <Route path="/login" render={withLazyLoading(LoginPage)} />
                        <Route path="/" render={() => <Redirect to="/profile"/>} />
                        <Route path="*" render={() => <div>404 not found</div>} />
                    </Switch>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    isIntialized: state.app.isIntialized
});

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

let SamuraiJSApp = (props) => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}


// let SamuraiJSApp = (props) => {
//     return (
//         <HashRouter>
//             <Provider store={store}>
//                 <AppContainer />
//             </Provider>
//         </HashRouter>
//     )
// }

export default SamuraiJSApp;
