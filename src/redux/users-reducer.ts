
import { usersAPI } from '../api/users-api'
import { updateObjectInArray } from '../utils/object-helper'
import { UserType } from '../types/types'
import {ResultCodeEnum} from '../api/api'
import { AppStateType, InferActionsTypes } from './redux-store'
import { Dispatch } from 'redux';
//import { ThunkAction } from 'redux-thunk'
import { BaseThunkType } from '../redux/redux-store'

// const FOLLOW = 'lesson001/users/FOLLOW';
// const UNFOLLOW = 'lesson001/users/UNFOLLOW';
// const SET_USERS = 'lesson001/users/SET-USERS';
// const SET_CURRENT_PAGE = 'lesson001/users/SET-CURRENT-PAGE';
// const SET_TOTAL_USERS_COUNT = 'lesson001/users/SET-TOTAL-USERS-COUNT';
// const TOGGLE_FETCHING = 'lesson001/users/IS-FETCHING';
// const TOGGLE_FOLLOWING_IN_PROGRESS = 'lesson001/users/FOLLOWING-IN-PROGRESS';

// -------------------------- action types ---------------------
// type FollowSuccessActionType = {
//   type: typeof FOLLOW
//   userId: number
// }
// type UnfollowSuccessActionType = {
//   type: typeof UNFOLLOW
//   userId: number
// }
// type SetUsersActionType = {
//   type: typeof SET_USERS
//   users: Array<UserType>
// }
// type SetCurrentPageActionType = {
//   type: typeof SET_CURRENT_PAGE
//   currentPage: number
// }
// type SetToatlUsersCountActionType = {
//   type: typeof SET_TOTAL_USERS_COUNT
//   totalUsersCount: number
// }
// type ToggleIsFetchingActionType = {
//   type: typeof TOGGLE_FETCHING
//   isFetching: boolean
// }
// type ToggleFollowingActionType = {
//   type: typeof TOGGLE_FOLLOWING_IN_PROGRESS
//   isProgress: boolean
//   userId: number
// }

//type ActionTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType | SetToatlUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingActionType;
type ActionsType = InferActionsTypes<typeof actions>
// --------------------- state type -------------------

// type InitialStateType = {
//   users: Array<UserType> // массив отображаемых пользователей
//   pageSize: number // число пользователей на странице
//   totalUsersCount: number // общее число пользователей
//   currentPage: number // текущая страница
//   isFetching: boolean // индикатор загрузки с сервера
//   followingInProgress: Array<number> // массив id пользователей, для которых просходит обновление "followed" (true/false) 
// }



let initialState = {
  users: [] as Array<UserType>,
  pageSize: 9 as number, // чтобы получить сетку 3x3
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  followingInProgress: [] as Array<number> // массив id юзеров, для которых выполняется обновление данных
};

type InitialStateType = typeof initialState;

const usersReducer = (state:InitialStateType = initialState, action: ActionsType) => {
  //let newState;
  switch (action.type) {
    case 'FOLLOW':
      return { ...state, users: updateObjectInArray(state.users, action.userId, "id", { followed: true }) }
    case 'UNFOLLOW':
      return { ...state, users: updateObjectInArray(state.users, action.userId, "id", { followed: false }) }
    case 'SET_USERS':
      return { ...state, users: [...action.users] };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage };
    case 'SET_TOTAL_USERS_COUNT':
      return { ...state, totalUsersCount: action.totalUsersCount };
    case 'TOGGLE_FETCHING':
      return { ...state, isFetching: action.isFetching };
    case 'TOGGLE_FOLLOWING_IN_PROGRESS':
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
// export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId: userId });
// export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId: userId });
// export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
// export const setCurrentPage = (page: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage: page });
// export const setTotalUsersCount = (count: number): SetToatlUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: count });
// export const toggleIsFetching = (fetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_FETCHING, isFetching: fetching });
// export const toggleFollowingInProgress = (isProgress: boolean, userId: number): ToggleFollowingActionType => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isProgress: isProgress, userId: userId });

// ниже вариант без типизации (пока)
export const actions = {
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId: userId} as const),
  unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId: userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', currentPage: page } as const),
  setTotalUsersCount: (count: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalUsersCount: count } as const),
  toggleIsFetching: (fetching: boolean) => ({ type: 'TOGGLE_FETCHING', isFetching: fetching } as const),
  toggleFollowingInProgress: (isProgress: boolean, userId: number) => ({ type: 'TOGGLE_FOLLOWING_IN_PROGRESS', isProgress: isProgress, userId: userId }  as const)
}

// thunks
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsType>;
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type ThunkType = BaseThunkType<ActionsType> // или <typeof actions>

export const requestUsers = (pageNumber: number, pageSize: number): ThunkType =>
  async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    let response = await usersAPI.getUsers(pageNumber, pageSize);
    dispatch(actions.setUsers(response.items));
    dispatch(actions.setTotalUsersCount(response.totalCount));
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setCurrentPage(pageNumber));
  };

export const onPageChanged = (pageNumber: number, pageSize: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(pageNumber));
    let response = await usersAPI.getUsers(pageNumber, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(response.items));
  }

// вынос общего кода из follow() и unfollow() в функцию _followUnfollowFlow()
// apiMehod - usersAPI.follow() или usersAPI.unfollow()
//const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: FUCType) => {
  
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(actions.toggleFollowingInProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.resultCode === ResultCodeEnum.SUCCESS) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType =>
  async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
  }

export const unfollow = (userId: number): ThunkType =>
  async (dispatch) => {
    _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
  }

export default usersReducer;