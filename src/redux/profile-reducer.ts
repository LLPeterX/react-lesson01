import { profileAPI } from '../api/profile-api';
import { stopSubmit } from 'redux-form';
import {PhotosType, ProfileType} from '../types/types'

const ADD_POST = 'lesson001/profile/ADD-POST';
const SET_USER_PROFILE = 'lesson001/profile/SET-USER-PROFILE';
const SET_STATUS = 'lesson001/profile/SET-STATUS';
const DELETE_POST = 'lesson001/profile/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'lesson001/profile/SAVE-PHOTO-SUCCESS'

type PostsDataType = {
  id: number
  message: string
  likes: number
}


type IntialStateType = {
  postsData: Array<PostsDataType>
  profile: ProfileType | null
  status: string | null
}

let initialState: IntialStateType = {
  postsData: [
    { id: 1, message: "Gotta to break free!", likes: 2 },
    { id: 2, message: "Пью пиво", likes: 20 }
  ],
  profile: null,
  status: ''
};

// ------------------------ action types --------------------
type AddPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}
type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType

}
type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType | null
}
type ActionType = AddPostActionType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType;
//-------------------------------------------------------------------------
const profileReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case ADD_POST:
      let lastPost = state.postsData.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
      let nextId = lastPost.id + 1;
      let postText = action.newPostText;
      let newPost = { id: nextId, message: postText, likes: 0 };
      return {
        ...state,
        postsData: [...state.postsData, newPost]
      };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case DELETE_POST:
      return { ...state, postsData: state.postsData.filter(e => e.id !== action.postId) };
    case SAVE_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } }
    default:
      return state;
  }
}
export const addPostActionCreator = (text: string): AddPostActionType => ({ type: ADD_POST, newPostText: text });
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => { return { type: SET_USER_PROFILE, profile }; }
export const setStatus = (status: string): SetStatusActionType => { return { type: SET_STATUS, status }; }
export const deletePost = (postId: number): DeletePostActionType => { return { type: DELETE_POST, postId }; }
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => { return { type: SAVE_PHOTO_SUCCESS, photos }; }

//thunks
export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
  let statusText = await profileAPI.getStatus(userId);
  dispatch(setStatus(statusText));
}

export const updateStatus = (statusText: string) => async (dispatch: any) => {
  try {
    let data = await profileAPI.updateStatus(statusText);
    if (!data.resultCode) { // if success, resultCode=0
      dispatch(setStatus(statusText));
    }
  } catch (error) {
    alert('Some error occured');
  }
}

export const savePhoto = (file: string) => async (dispatch: any) => {
  let data = await profileAPI.savePhoto(file); // не file.name, а сам объект 
  if (!data.resultCode) {
    dispatch(savePhotoSuccess(data.data)); // да, data.data
  }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  let data = await profileAPI.saveProfile(profile);
  if (!data.resultCode) {
    const userId = getState().auth.userId;
    dispatch(getUserProfile(userId));
    console.log('saveProfile success for id=' + userId);
  } else {
    let errorMessage = data.messages.join(",");
    const invalidFieldName = errorMessage.slice(errorMessage.indexOf(">") + 1, errorMessage.indexOf(')')).toLowerCase();
    console.log('error: ' + data.messages + ', field=' + invalidFieldName);
    dispatch(stopSubmit('profile-edit', { _error: { fieldName: 'contacts.' + invalidFieldName, message: errorMessage } }));
    return Promise.reject(errorMessage);
  }
}


export default profileReducer;