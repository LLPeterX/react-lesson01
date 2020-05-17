import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavBar from './components/NavBar/NavBar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from './components/Users/UsersContainer';
import { Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './components/Login/Login';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer />
                <NavBar />
                <div className="app-wrapper-content">
                    <Route path="/profile/:userId?" render={() => <ProfileContainer /> } />
                    <Route path="/dialogs" render={() => <DialogsContainer />} />
                    <Route path="/users" render={()=> <UsersContainer />}/>
                    <Route path="/login" render={()=> <LoginPage />}/>

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
