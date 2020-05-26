import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';

//import ProfileContainer from "./components/Profile/ProfileContainer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import UsersContainer from './components/Users/UsersContainer';

import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
//import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import withLazyLoading from './hoc/withLazyLoading'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const LoginPage = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }
    render() {

        if (!this.props.isIntialized) return <Preloader />
        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <NavBar />
                <div className="app-wrapper-content">
                    {/* <Route path="/profile/:userId?" render={() =>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ProfileContainer />
                        </Suspense>
                    } /> */}
                    <Route path="/profile/:userId?" render={withLazyLoading(ProfileContainer)} />
                    <Route path="/dialogs" render={withLazyLoading(DialogsContainer)} />
                    <Route path="/users" render={withLazyLoading(UsersContainer)} />
                    <Route path="/login" render={withLazyLoading(LoginPage)} />

                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    isIntialized: state.app.isIntialized
});

//export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

let SamuraiJSApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiJSApp;
