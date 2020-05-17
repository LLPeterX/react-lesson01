import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
//const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

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
    // case UPDATE_POST_TEXT:
    //   return { ...state, newPostText: action.newPostText };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
}
export const addPostActionCreator = (text) => ({ type: ADD_POST, newPostText: text });
//export const updateNewPostTextActionCreator = (text) => { return { type: UPDATE_POST_TEXT, newPostText: text }; }
export const setUserProfile = (profile) => { return { type: SET_USER_PROFILE, profile: profile }; }
export const setStatus = (status) => { return { type: SET_STATUS, status }; }

//thunks
export const getUserProfile = (userId) => (dispatch) => {
  if (!userId) userId = "7773"; // Если профиль не указан, выдваем профиль текущего пользователя.
  profileAPI.getProfile(userId)
    .then(responce => {
      dispatch(setUserProfile(responce.data));
    })
    .catch(error => {
      console.log("getUserProfile error:");
      console.log(error);
    });
}
export const getStatus = (userId) => (dispatch) => {
  if (!userId) userId = "7773";
  profileAPI.getStatus(userId)
    .then(responce => {
      dispatch(setStatus(responce.data));
    })
    .catch(error => {
      console.log("reducer getStatus() error:");
      console.log(error);
    });
}

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status)
    .then(responce => {
      if (responce.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    })
    .catch(error => {
      console.log("reducer updateStatus() error:");
      console.log(error);
    });
}

export default profileReducer;