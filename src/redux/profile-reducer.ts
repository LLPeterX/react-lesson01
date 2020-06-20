import { profileAPI } from '../api/profile-api';
import { stopSubmit, FormAction } from 'redux-form';
import { PhotosType, ProfileType } from '../types/types'
import { InferActionsTypes, BaseThunkType } from './redux-store';

// const ADD_POST = 'lesson001/profile/ADD-POST';
// const SET_USER_PROFILE = 'lesson001/profile/SET-USER-PROFILE';
// const SET_STATUS = 'lesson001/profile/SET-STATUS';
// const DELETE_POST = 'lesson001/profile/DELETE-POST'
// const SAVE_PHOTO_SUCCESS = 'lesson001/profile/SAVE-PHOTO-SUCCESS'

export type PostType = {
  id: number
  message: string
  likes: number
}

let initialState = {
  postsData: [
    { id: 1, message: "Gotta to break free!", likes: 2 },
    { id: 2, message: "Пью пиво", likes: 20 }
  ] as Array<PostType>,
  profile: null as ProfileType|null,
  status: '' as string
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType | FormAction>

// ------------------------ action types --------------------
// type AddPostActionType = {
//   type: typeof ADD_POST
//   newPostText: string
// }
// type SetUserProfileActionType = {
//   type: typeof SET_USER_PROFILE
//   profile: ProfileType

// }
// type SetStatusActionType = {
//   type: typeof SET_STATUS
//   status: string
// }
// type DeletePostActionType = {
//   type: typeof DELETE_POST
//   postId: number
// }
// type SavePhotoSuccessActionType = {
//   type: typeof SAVE_PHOTO_SUCCESS
//   photos: PhotosType | null
// }
// type ActionType = AddPostActionType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType;
//-------------------------------------------------------------------------
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST':
      let lastPost = state.postsData.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
      let nextId = lastPost.id + 1;
      let postText = action.newPostText;
      let newPost = { id: nextId, message: postText, likes: 0 };
      return {
        ...state,
        postsData: [...state.postsData, newPost]
      };
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.profile };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'DELETE_POST':
      return { ...state, postsData: state.postsData.filter(e => e.id !== action.postId) };
    case 'SAVE_PHOTO_SUCCESS':
      // здесь мы уточняем тип profile 
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
    default:
      return state;
  }
}
export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'ADD_POST', newPostText }) as const,
  setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile }) as const,
  setStatus: (status: string) => ({ type: 'SET_STATUS', status }) as const,
  deletePost: (postId: number) => ({ type: 'DELETE_POST', postId }) as const,
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos }) as const
}

//thunks
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let statusText = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(statusText));
}

export const updateStatus = (statusText: string): ThunkType => async (dispatch) => {
  try {
    let data = await profileAPI.updateStatus(statusText);
    if (!data.resultCode) { // if success, resultCode=0
      dispatch(actions.setStatus(statusText));
    }
  } catch (error) {
    alert('Some error occured');
  }
}

// ниже не понятно. По идее file - объект PhotosType
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file); // не file.name, а сам объект 
  if (!data.resultCode) {
    dispatch(actions.savePhotoSuccess(data.data)); // да, data.data
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  let data = await profileAPI.saveProfile(profile);
  if (!data.resultCode) {
    // если профиль успешго сохранен, то даем команду загрузить с сервера тольео что сохраненный профиль - 
    // т.е.  текущего (аутентифицированного) пользователя
    const userId = getState().auth.userId;
    if (userId != null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error("userId cannot be null");
    }
    //    console.log('saveProfile success for id=' + userId);
  } else {
    // если созхранение профиля неудачно, то достаем сообщение об ошибке и вычленяем из него имя неверного поля.
    // после этого останавливаем submit формы и выдаем сообщение об ошибке.
    // Т.к. сначала сработал успешный ответ сервера, то в случае неверных данных возвращаем reject
    let errorMessage = data.messages.join(",");
    const invalidFieldName = errorMessage.slice(errorMessage.indexOf(">") + 1, errorMessage.indexOf(')')).toLowerCase();
    //  console.log('error: ' + data.messages + ', field=' + invalidFieldName);
    dispatch(stopSubmit('profile-edit', { _error: { fieldName: 'contacts.' + invalidFieldName, message: errorMessage } }));
    return Promise.reject(errorMessage);
  }
}


export default profileReducer;