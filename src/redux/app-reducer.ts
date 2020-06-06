import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS='lesson001/app/INITIALIZED-SUCCESS';

// Объявление типа
type InitialStateType = {
  isIntialized: boolean
}

// Начальный стейт
let initialState: InitialStateType = {
  isIntialized: false
}

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

const appReducer = (state=initialState, action: InitializedSuccessActionType):InitialStateType => {
  switch(action.type) {
    case INITIALIZED_SUCCESS:
      return {...state, isIntialized: true};
    default:
      return state;  
  }
}

export const initializedSuccess = ():InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS} );

// thunk
export const initializeApp = () => (dispatch:any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then( () => {dispatch(initializedSuccess())});
}


export default appReducer;