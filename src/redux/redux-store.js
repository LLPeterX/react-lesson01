import {createStore, combineReducers, applyMiddleware} from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

// собираем все базове компоненты в один объект
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sideBar: sidebarReducer, 
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer
});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store; // верменный глобальный объект

export default store;