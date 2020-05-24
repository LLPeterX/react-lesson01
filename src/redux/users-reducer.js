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
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] // массив id юзеров, для которых выполняется обновление данных
};
const usersReducer = (state = initialState, action) => {
  //let newState;
  switch (action.type) {
    case FOLLOW:
      // return {
      //   ...state,
      //     users: state.users.map(u => {
      //       if (u.id === action.userId) {
      //         return { ...u, followed: true }
      //       }
      //       return u; 
      //     })
      // }
      return {...state, users: updateObjectInArray(state.users, action.userId, "id",{followed:true})}
    case UNFOLLOW:
     
      // return {
      //   ...state,
      //   users: state.users.map(u => {
      //     if (u.id === action.userId) {
      //       return { ...u, followed: false }
      //     }
      //     return u; 
      //   })
      // }
      // в initialState массив users[] пустой, его состав см. в документации API
      return {...state, users: updateObjectInArray(state.users, action.userId, "id",{followed:false})}
    case SET_USERS:
      //return {...state, users: [...state.users, ...action.users]};
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
//export const getUsers = (currentPage, pageSize) => (dispatch) => {
// export const requestUsers = (page, pageSize) => (dispatch) => {
//   dispatch(toggleIsFetching(true));
//   usersAPI.getUsers(page, pageSize)
//     .then(responce => {
//       dispatch(setUsers(responce.items));
//       dispatch(setTotalUsersCount(responce.totalCount));
//       dispatch(toggleIsFetching(false));
//       dispatch(setCurrentPage(page));
//     })
//     .catch(error => {
//       console.log("getUsers() error:");
//       console.log(error);
//     });
//   setTotalUsersCount();
// };

export const requestUsers = (pageNumber, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  let response = await usersAPI.getUsers(pageNumber, pageSize);
  dispatch(setUsers(response.items));
  dispatch(setTotalUsersCount(response.totalCount));
  dispatch(toggleIsFetching(false));
  dispatch(setCurrentPage(pageNumber));
  setTotalUsersCount();
};

// export const onPageChanged = (pageNumber, pageSize) => (dispatch) => {
//   dispatch(toggleIsFetching(true));
//   dispatch(setCurrentPage(pageNumber));
//   usersAPI.getUsers(pageNumber, pageSize) // тут тоже getUsers!
//     .then(responce => {
//       dispatch(toggleIsFetching(false));
//       dispatch(setUsers(responce.items));
//     })
//     .catch(error => {
//       console.log("onPageChanged() error");
//       console.log(error);
//     });
// }
export const onPageChanged = (pageNumber, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(pageNumber));
  let response = await usersAPI.getUsers(pageNumber, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(response.items));
}

// export const follow = (id) => (dispatch) => {
//   console.log('reducer call follow()');
//     dispatch(toggleFollowingInProgress(true, id));
//   usersAPI.follow(id)
//     .then(responce => {
//       if (responce.resultCode === 0) {
//         dispatch(followSuccess(id));
//       }
//       dispatch(toggleFollowingInProgress(false, id));
//     })
//     .catch(error => {
//       console.log("unfollow error");
//       console.log(error);
//     });
// }

// export const unfollow = (id) => (dispatch) => {
//   console.log('reducer call follow()');
//   dispatch(toggleFollowingInProgress(true, id))
//   usersAPI.unfollow(id)
//     .then(responce => {
//       if (responce.resultCode === 0) {
//         dispatch(unfollow(id));
//       }
//       dispatch(toggleFollowingInProgress(false, id))
//     })
//     .catch(error => {
//       console.log("unfollow error");
//       console.log(error);
//     });
// }

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