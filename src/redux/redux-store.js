import {createStore, combineReducers, applyMiddleware} from 'redux';
import profileReducer from './profile-reducer.ts';
import dialogsReducer from './dialogs-reducer.ts';
import sidebarReducer from './sidebar-reducer.ts';
import usersReducer from './users-reducer.ts';
import authReducer from './auth-reducer.ts';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer.ts';

// собираем все базовые редюсеры в один объект (в т.ч. объединяем все state)
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sideBar: sidebarReducer, 
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer, // из lib 'redux-form'
  app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store; // врeменный глобальный объект для отладки

export default store;