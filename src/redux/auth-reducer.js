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
      // let newState = {...state, ...action.payload};
      // return newState;
      return {...state, ...action.payload};
    default:
      return state;  
  }
}

export const setAuthUserData = (userId,email,login, isAuth) => ({ type: SET_USER_DATA, payload: {userId,email,login, isAuth} });

// thunk

export const getAuthUserData = () => (dispatch) => {
//  console.log('Call auth-reducer.getAuthData() and authAPI.me()');
  authAPI.me()
  .then(response => {
    // console.log('authAPI.me() result='+response.data.resultCode);
    // console.log(response);
    if(response.data.resultCode===0) {
      let {id, login, email} = response.data.data;
      //console.log(response.data);
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
      //console.log("thunk login failed: "+response.data.messages);
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