import { usersAPI } from '../api/api'
import {updateObjectInArray} from '../utils/object-helper'

const FOLLOW = 'lesson001/users/FOLLOW';
const UNFOLLOW = 'lesson001/users/UNFOLLOW';
const SET_USERS = 'lesson001/users/SET-USERS';
const SET_CURRENT_PAGE = 'lesson001/users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'lesson001/users/SET-TOTAL-USERS-COUNT';
const TOGGLE_FETCHING = 'lesson001/users/IS-FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'lesson001/users/FOLLOWING-IN-PROGRESS';

let initialState = {
  users: [],
  pageSize: 9,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] // массив id юзеров, для которых выполняется обновление данных
};
const usersReducer = (state = initialState, action) => {
  //let newState;
  switch (action.type) {
    case FOLLOW:
      return {...state, users: updateObjectInArray(state.users, action.userId, "id",{followed:true})}
    case UNFOLLOW:
      return {...state, users: updateObjectInArray(state.users, action.userId, "id",{followed:false})}
    case SET_USERS:
      return { ...state, users: [...action.users] };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount };
    case TOGGLE_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isProgress
          ? [...state.followingInProgress, action.userId] // add userId to array
          : [...state.followingInProgress].filter(id => id !== action.userId) // remove id from array
      };
    default:
      return state;
  }

}
export const followSuccess = (userId) => ({ type: FOLLOW, userId: userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId: userId });
export const setUsers = (users) => ({ type: SET_USERS, users: users });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, currentPage: page });
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: count });
export const toggleIsFetching = (fetching) => ({ type: TOGGLE_FETCHING, isFetching: fetching });
export const toggleFollowingInProgress = (isProgress, userId) => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isProgress: isProgress, userId: userId });

// thunks

export const requestUsers = (pageNumber, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  let response = await usersAPI.getUsers(pageNumber, pageSize);
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));
  dispatch(toggleIsFetching(false));
  dispatch(setCurrentPage(pageNumber));
  setTotalUsersCount();
};


export const onPageChanged = (pageNumber, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(pageNumber));
  let response = await usersAPI.getUsers(pageNumber, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(response.items));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(toggleFollowingInProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === 0) { // было просто response.resultCode и работало!
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingInProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
  let apiMethod = usersAPI.follow.bind(usersAPI);
  let actionCreator = followSuccess;
  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}

export const unfollow = (userId) => async (dispatch) => {
  // сокращенный вариант без промежуточных переменных
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;