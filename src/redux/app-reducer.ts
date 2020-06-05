import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS='lesson001/app/INITIALIZED-SUCCESS';

type InitialStateType = {
  isIntialized: boolean
}

let initialState: InitialStateType = {
  isIntialized: false
}

type ActionType = {
  type: typeof INITIALIZED_SUCCESS
}

const appReducer = (state=initialState, action: ActionType) => {
  switch(action.type) {
    case INITIALIZED_SUCCESS:
      return {...state, isIntialized: true};
    default:
      return state;  
  }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS} );

// thunk
export const initializeApp = () => (dispatch:any) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then( () => {dispatch(initializedSuccess())});
}


export default appReducer;