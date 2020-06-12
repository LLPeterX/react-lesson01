import {createStore, combineReducers, applyMiddleware} from 'redux'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer'

// собираем все базовые редюсеры в один объект (в т.ч. объединяем все state)
let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sideBar: sidebarReducer, 
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer, // из lib 'redux-form'
  app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

//type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
//type ActionsTypes<T extends {[key: string]: (...args:any)=>any}> = ReturnType<PropertiesType<T>>
export type InferActionsTypes<T extends {[key: string]: (...args:any)=>any}> = 
  ReturnType<T extends {[key: string]: infer U} ? U : never>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
//@ts-ignore
window.__store__ = store; // врeменный глобальный объект для отладки

export default store;