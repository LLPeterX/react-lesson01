
import { usersAPI } from '../api/api'
import {updateObjectInArray} from '../utils/object-helper'
import {UserType} from '../types/types'

const FOLLOW = 'lesson001/users/FOLLOW';
const UNFOLLOW = 'lesson001/users/UNFOLLOW';
const SET_USERS = 'lesson001/users/SET-USERS';
const SET_CURRENT_PAGE = 'lesson001/users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'lesson001/users/SET-TOTAL-USERS-COUNT';
const TOGGLE_FETCHING = 'lesson001/users/IS-FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'lesson001/users/FOLLOWING-IN-PROGRESS';

// -------------------------- action types ---------------------
type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UserType>
}
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
type SetToatlUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_FETCHING
  isFetching: boolean
}
type ToggleFollowingActionType = {
  type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
  isProgress: boolean
  userId: number
}

type FollowUnfollowActionType = FollowSuccessActionType|UnfollowSuccessActionType;
type ActionType = FollowSuccessActionType|UnfollowSuccessActionType|SetUsersActionType|SetCurrentPageActionType|SetToatlUsersCountActionType|ToggleIsFetchingActionType|ToggleFollowingActionType;
// --------------------- state type -------------------
 
type InitialStateType = {
  users: Array<UserType> // массив отображаемых пользователей
  pageSize: number // число пользователей на странице
  totalUsersCount: number // общее число пользователей
  currentPage: number // текущая страница
  isFetching: boolean // индикатор загрузки с сервера
  followingInProgress: Array<number> // массив id пользователей, для которых просходит обновление "followed"
}

 

let initialState:InitialStateType = {
  users: [],
  pageSize: 9, // чтобы получить сетку 3x3
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] // массив id юзеров, для которых выполняется обновление данных
};
const usersReducer = (state = initialState, action:ActionType) => {
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
export const followSuccess = (userId:number):FollowSuccessActionType => ({ type: FOLLOW, userId: userId });
export const unfollowSuccess = (userId:number):UnfollowSuccessActionType => ({ type: UNFOLLOW, userId: userId });
export const setUsers = (users:Array<UserType>):SetUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPage = (page:number):SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage: page });
export const setTotalUsersCount = (count:number):SetToatlUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: count });
export const toggleIsFetching = (fetching: boolean):ToggleIsFetchingActionType => ({ type: TOGGLE_FETCHING, isFetching: fetching });
export const toggleFollowingInProgress = (isProgress:boolean, userId:number):ToggleFollowingActionType => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isProgress: isProgress, userId: userId });

// thunks

export const requestUsers = (pageNumber:number, pageSize:number) => async (dispatch:any) => {
  dispatch(toggleIsFetching(true));
  let response = await usersAPI.getUsers(pageNumber, pageSize);
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));
  dispatch(toggleIsFetching(false));
  dispatch(setCurrentPage(pageNumber));
 
};


export const onPageChanged = (pageNumber:number, pageSize:number) => async (dispatch:any) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(pageNumber));
  let response = await usersAPI.getUsers(pageNumber, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(response.items));
}

const followUnfollowFlow = async (dispatch:any, userId:number, apiMethod:any, actionCreator:any) => {
  dispatch(toggleFollowingInProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === 0) { // было просто response.resultCode и работало!
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingInProgress(false, userId));
}

export const follow = (userId:number) => async (dispatch:any) => {
  let apiMethod = usersAPI.follow.bind(usersAPI);
  let actionCreator = followSuccess;
  followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
}

export const unfollow = (userId:number) => async (dispatch:any) => {
  // сокращенный вариант без промежуточных переменных
  followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;