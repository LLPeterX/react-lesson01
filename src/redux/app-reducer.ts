import {getAuthUserData} from './auth-reducer';
import {InferActionsTypes} from '../redux/redux-store'

const INITIALIZED_SUCCESS='lesson001/app/INITIALIZED-SUCCESS';

// Начальный стейт, с добавлением типизации через typeof
let initialState = {
  isIntialized: false as boolean
}

export type InitialStateType = typeof initialState; // тип сетейта

type ActionsTypes = InferActionsTypes<typeof actions> // тип actions. Объект actions см. ниже

const appReducer = (state=initialState, action:ActionsTypes):InitialStateType => {
  switch(action.type) {
    case INITIALIZED_SUCCESS:
      return {...state, isIntialized: true};
    default:
      return state;  
  }
}

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS} )
}
// thunk
export const initializeApp = () => (dispatch:any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then( () => {dispatch(actions.initializedSuccess())});
}

export default appReducer;