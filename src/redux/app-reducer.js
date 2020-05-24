import {getAuthUserData} from './auth-reducer';

const INITIALIZED_SUCCESS='lesson001/app/INITIALIZED-SUCCESS';

let initialState = {
  isIntialized: false
}

const appReducer = (state=initialState, action) => {
  switch(action.type) {
    case INITIALIZED_SUCCESS:
      return {...state, isIntialized: true};
    default:
      return state;  
  }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS} );

// thunk
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then( () => {dispatch(initializedSuccess())});
}


export default appReducer;