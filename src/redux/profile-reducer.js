import { profileAPI } from '../api/api';

const ADD_POST = 'lesson001/profile/ADD-POST';
const SET_USER_PROFILE = 'lesson001/profile/SET-USER-PROFILE';
const SET_STATUS = 'lesson001/profile/SET-STATUS';
const DELETE_POST = 'lesson001/profile/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'lesson001/profile/SAVE-PHOTO-SUCCESS'

let initialState = {
  postsData: [
    { id: 1, message: "Gotta to break free!", likes: 2 },
    { id: 2, message: "Пью пиво", likes: 20 }
  ],
  //  newPostText: '',
  profile: null,
  status: ''
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let lastPost = state.postsData.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
      let nextId = lastPost.id + 1;
      //let postText = `${state.newPostText} (id=${nextId})`;
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
      return {...state, profile: {...state.profile, photos: action.photos}}  
    default:
      return state;
  }
}
export const addPostActionCreator = (text) => ({ type: ADD_POST, newPostText: text });
//export const updateNewPostTextActionCreator = (text) => { return { type: UPDATE_POST_TEXT, newPostText: text }; }
export const setUserProfile = (profile) => { return { type: SET_USER_PROFILE, profile: profile }; }
export const setStatus = (status) => { return { type: SET_STATUS, status }; }
export const deletePost = (postId) => { return { type: DELETE_POST, postId }; }
export const savePhotoSuccess = (photos) => { return { type: SAVE_PHOTO_SUCCESS, photos }; }

//thunks
export const getUserProfile = (userId) => async (dispatch) => {
  //if (!userId) userId = "7773"; // Если профиль не указан, выдваем профиль текущего пользователя.
  let response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
  //if (!userId) userId = "7773";
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (!response.data.resultCode) { // if success, resultCode=0
    dispatch(setStatus(status));
  }
}

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file); // не file.name, а сам объект 
  if (!response.data.resultCode) {
    dispatch(savePhotoSuccess(response.data.data.photos)); // да, data.data
  }
}



export default profileReducer;