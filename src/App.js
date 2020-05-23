import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from './components/Users/UsersContainer';
import { Route, BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router';
import LoginPage from './components/Login/Login';
//import { getAuthUserData } from './redux/auth-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store from './redux/redux-store';


class App extends React.Component {

    componentDidMount() {
        //this.props.getAuthUserData();
        this.props.initializeApp();
    }
    render() {

        if (!this.props.isIntialized) return <Preloader />
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <div className="app-wrapper">
                        <HeaderContainer />
                        <NavBar />
                        <div className="app-wrapper-content">
                            <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                            <Route path="/dialogs" render={() => <DialogsContainer />} />
                            <Route path="/users" render={() => <UsersContainer />} />
                            <Route path="/login" render={() => <LoginPage />} />

                        </div>
                    </div>
                </Provider>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state) => ({
    isIntialized: state.app.isIntialized
});

export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

