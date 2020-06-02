//import React from 'react';
import { authAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'lesson001/auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'lesson001/GET-CAPTCHA-URL';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isFetching: false,
  isAuth: false,
  captchaUrl: null // if null, then not required
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload }; // декомпозиция объекта payload на саойства; userId, email
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });
export const setCaptchaUrlSuccess = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } });


// thunk

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me();
  if (response.data.resultCode === 0) {
    let { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  } else {
    console.log('getAuthUserData() Error: ' + response.data.messages);
  }
}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  switch (response.data.resultCode) {
    case 0: // success
      dispatch(getAuthUserData());
      break;
    case 10: // captcha required
      dispatch(getCaptchaUrl());
      break;
    default:
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Ошибка входа';
      let action = stopSubmit('login', { _error: message });
      dispatch(action);
  }
}

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaURL();
  const captchaUrl = response.data.url;
  dispatch(setCaptchaUrlSuccess(captchaUrl));
}



export default authReducer;