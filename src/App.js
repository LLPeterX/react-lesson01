import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from './components/Users/UsersContainer';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';


class App extends React.Component {

    componentDidMount() {
        //this.props.getAuthUserData();
        this.props.initializeApp();
    }
    render() {

        if (!this.props.isIntialized) return <Preloader />
        return (
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
        );
    }
}

let mapStateToProps = (state) => ({
    isIntialized: state.app.isIntialized
});

export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);

