import { stopSubmit, FormAction } from 'redux-form';
import { authAPI } from '../api/auth-api'
import { securityAPI } from '../api/security-api'
import { ResultCodeEnum } from '../api/api'
import { InferActionsTypes, BaseThunkType } from './redux-store'
import { Dispatch } from 'redux';

const SET_USER_DATA = 'lesson001/auth/SET-USER-DATA';
const GET_CAPTCHA_URL_SUCCESS = 'lesson001/GET-CAPTCHA-URL';

type SetUserDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
// type SetUserDataActionType = {
//   type: typeof SET_USER_DATA,
//   payload: SetUserDataActionPayloadType
//}
type GetCaptchaUrlSuccessActionPayloadType = {
  captchaUrl: string
}
// type GetCaptchaUrlSuccessActionType = {
//   type: typeof GET_CAPTCHA_URL_SUCCESS,
//   payload: GetCaptchaUrlSuccessActionPayloadType
// }

//type ActionTypes = SetUserDataActionType | GetCaptchaUrlSuccessActionType;
type ActionTypes = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionTypes>;

// ниже создадим тип InitialStateType на основе существующего объекта initialState
// хотя лучше использовать тип|null

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false as boolean,
  isAuth: false as boolean,
  captchaUrl: null as string|null
}

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload }; // декомпозиция объекта payload на саойства userId, email, login и isAuth
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state, ...action.payload }; // декомпомозиция payload на captchaUrl. Аналог { ...state, captchaUrl:action.payload.captchaUrl }
    default:
      return state;
  }
}

const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
    { type: SET_USER_DATA, payload: { userId, email, login, isAuth } }
  ) as const,
  setCaptchaUrlSuccess: (captchaUrl: string) => (
    { type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } }
  ) as const
}

// Тип функций-thunks
// Ниже мы вынесли в redix-store как BaseThunkType<>
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> 
//type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>>
// можно через тип FormAction, но он слишком общий и позволдяет случайно задиспачить не то, что надо, а через typeof stopSubmit мы ограничиваем типы actions
type ThunkType = BaseThunkType<ActionTypes | FormAction>
// thunks

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let response = await authAPI.me();
  if (response.data.resultCode === ResultCodeEnum.SUCCESS) {
    let { id, login, email } = response.data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  } else {
    console.log('getAuthUserData() Error: ' + response.data.messages);
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => async (dispatch) => {
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
//      let action = stopSubmit('login', { _error: message });
      dispatch(stopSubmit('login', { _error: message }));
  }
}

export const logout = (): ThunkType => async (dispatch: DispatchType) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodeEnum.SUCCESS) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch: DispatchType) => {
  const data = await securityAPI.getCaptchaURL();
  const captchaUrl = data.url;
  dispatch(actions.setCaptchaUrlSuccess(captchaUrl));
}



export default authReducer;