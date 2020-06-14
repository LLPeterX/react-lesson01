import { stopSubmit } from 'redux-form';
import { authAPI } from '../api/auth-api'
import {securityAPI} from '../api/security-api'
import {ResultCodeEnum} from '../api/api'
import { ThunkAction } from 'redux-thunk';
import {AppStateType} from './redux-store'
import { Dispatch } from 'redux';

const SET_USER_DATA = 'lesson001/auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'lesson001/GET-CAPTCHA-URL';

type SetUserDataActionPayloadType = {
  userId: number | null
  email: string| null
  login: string | null
  isAuth: boolean
}
type SetUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: SetUserDataActionPayloadType
}
type GetCaptchaUrlSuccessActionPayloadType = {
  captchaUrl: string
}
type GetCaptchaUrlSuccessActionType = {
  type:  typeof GET_CAPTCHA_URL_SUCCESS,
  payload: GetCaptchaUrlSuccessActionPayloadType
}

type ActionTypes = SetUserDataActionType|GetCaptchaUrlSuccessActionType;
type DispatchType = Dispatch<ActionTypes>;

// ниже создадим тип InitialStateType на основе существующего объекта initialState
type Nullable<T> = T | null;

let initialState = {
  userId: null as Nullable<number>,
  email: null as Nullable<string>,
  login: null as Nullable<string>,
  isFetching: false as boolean,
  isAuth: false as boolean,
  captchaUrl: null as Nullable<string>
}

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action:ActionTypes):InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload }; // декомпозиция объекта payload на саойства userId, email, login и isAuth
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state, ...action.payload }; // декомпомозиция payload на captchaUrl. Аналог { ...state, captchaUrl:action.payload.captchaUrl }
    default:
      return state;
  }
}

export const setAuthUserData = (userId:number|null, email:string|null, login:string|null, isAuth:boolean):SetUserDataActionType => (
  { type: SET_USER_DATA, payload: { userId, email, login, isAuth } }
 );
export const setCaptchaUrlSuccess = (captchaUrl:string):GetCaptchaUrlSuccessActionType => (
  { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } }
);

// Тип функций-thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
// thunks

export const getAuthUserData = ():ThunkType => async (dispatch:DispatchType) => {
  let response = await authAPI.me();
  if (response.data.resultCode === ResultCodeEnum.SUCCESS) {
    let { id, login, email } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  } else {
    console.log('getAuthUserData() Error: ' + response.data.messages);
  }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string|null):ThunkType => async (dispatch:any) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);
  switch (response.data.resultCode) {
    case ResultCodeEnum.SUCCESS: // login success
      dispatch(getAuthUserData());
      break;
    case ResultCodeEnum.CAPTCHA_REQUIRED: // captcha required
      dispatch(getCaptchaUrl());
      break;
    default:
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Ошибка входа';
      let action = stopSubmit('login', { _error: message });
      dispatch(action);
  }
}

export const logout = ():ThunkType => async (dispatch:DispatchType) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.SUCCESS) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch:DispatchType) => {
  const data = await securityAPI.getCaptchaURL();
  const captchaUrl = data.url;
  dispatch(setCaptchaUrlSuccess(captchaUrl));
}



export default authReducer;