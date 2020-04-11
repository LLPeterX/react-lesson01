import React from 'react';
import './css/App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
// import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import Profile from "./components/Profile/Profile";
import {Route, BrowserRouter} from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className="app-wrapper-content">
                    <Route component={Dialogs} path="/dialogs" />
                    <Route component={Profile} path="/profile" />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
