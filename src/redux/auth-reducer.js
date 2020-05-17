//import React from 'react';
import {authAPI} from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA='SET-USER-DATA';

let initialState = {
  userId:null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      return {...state, ...action.payload};
    default:
      return state;  
  }
}

export const setAuthUserData = (userId,email,login, isAuth) => ({ type: SET_USER_DATA, payload: {userId,email,login, isAuth} });

// thunk

export const getAuthUserData = () => (dispatch) => {
  return authAPI.me()
  .then(response => {
    // console.log('getAuthData answer: '+response.data.resultCode);
    // console.log(response);
    if(response.data.resultCode===0) {
      let {id, login, email} = response.data.data;
      dispatch(setAuthUserData(id,email,login,true));
    } else {
      console.log('getAuthUserData() Error: '+response.data.messages);
    }
  })
  .catch(error => {
    console.log("onPageChanged() error:"+error);
  });
}

export const login = (email,password,rememberMe) => (dispatch) => {
  authAPI.login(email,password,rememberMe)
  .then(response => {
    if(response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let message = response.data.messages.length>0 ? response.data.messages[0] : 'Ошибка входа';
      let action = stopSubmit('login',{_error: message});
      dispatch(action);
    }
  })
  .catch(error => {
    console.log("login error: "+error);
  });
}

export const logout = () => (dispatch) => {
  authAPI.logout().then(response => {
    if(response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
}
  



export default authReducer;