import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';

import { Route } from 'react-router-dom';
import { withRouter, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import { HashRouter } from 'react-router-dom';
import store, { AppStateType } from './redux/redux-store';
import { withLazyLoading } from './hoc/withLazyLoading'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));


type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchType = {
    initializeApp: () => void
}

const SuspendedUsers = withLazyLoading(UsersContainer);
const SuspendedDialogs = withLazyLoading(DialogsContainer);

class App extends React.Component<MapPropsType & MapDispatchType> {

    // arrow func - чтобы сохранился контекст this
    catchAllUnhandledErrors = (ev: PromiseRejectionEvent) => {
        // alert('Error occured: '+promiseRejectionEvent.reason);
        console.error(ev);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);

    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
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
                        <Route path="/dialogs" render={() => <SuspendedDialogs />} />
                        <Route path="/users" render={() => <SuspendedUsers />} />
                        <Route path="/login" render={() => <LoginPage />} />
                        <Route path="/" render={() => <Redirect to="/profile" />} />
                        <Route path="*" render={() => <div>404 not found</div>} />
                    </Switch>
                </div>
            </div>
        );
    }
}


let mapStateToProps = (state: AppStateType) => ({
    isIntialized: state.app.isIntialized
});

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

let SamuraiJSApp: React.FC = () => {
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
