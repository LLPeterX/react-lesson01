import { usersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_FETCHING = 'IS-FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'FOLLOWING-IN-PROGRESS';

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
};
const usersReducer = (state = initialState, action) => {
  //let newState;
  switch (action.type) {
    case FOLLOW:
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: !u.followed }
          }
          return u; // важно не забыть!
        })
      }
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
export const followSuceess = (userId) => ({ type: FOLLOW, userId: userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId: userId });
export const setUsers = (users) => ({ type: SET_USERS, users: users });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, currentPage: page });
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: count });
export const toggleIsFetching = (fetching) => ({ type: TOGGLE_FETCHING, isFetching: fetching });
export const toggleFollowingInProgress = (isProgress, userId) => ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, isProgress: isProgress, userId: userId });

// thunks
//export const getUsers = (currentPage, pageSize) => (dispatch) => {
export const requestUsers = (page, pageSize) => (dispatch) => {  
  dispatch(toggleIsFetching(true));
  usersAPI.getUsers(page, pageSize)
    .then(responce => {
      dispatch(setUsers(responce.items));
      dispatch(setTotalUsersCount(responce.totalCount));
      dispatch(toggleIsFetching(false));
      dispatch(setCurrentPage(page));
    })
    .catch(error => {
      console.log("getUsers() error:");
      console.log(error);
    });
  setTotalUsersCount();
};

export const onPageChanged = (pageNumber, pageSize) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(pageNumber));
  usersAPI.getUsers(pageNumber, pageSize) // тут тоже getUsers!
    .then(responce => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(responce.items));
    })
    .catch(error => {
      console.log("onPageChanged() error");
      console.log(error);
    });
}

export const follow = (id) => (dispatch) => {
  dispatch(toggleFollowingInProgress(true, id));
  usersAPI.unfollow(id)
    .then(responce => {
      if (responce.resultCode === 0) {
        dispatch(unfollowSuccess(id));
      }
      dispatch(toggleFollowingInProgress(false, id));
    })
    .catch(error => {
      console.log("unfollow error");
      console.log(error);
    });
}

export const unfollow = (id) => (dispatch) => {
  dispatch(toggleFollowingInProgress(true, id))
  usersAPI.follow(id)
    .then(responce => {
      if (responce.resultCode === 0) {
        dispatch(follow(id));
      }
      dispatch(toggleFollowingInProgress(false, id))
    })
    .catch(error => {
      console.log("unfollow error");
      console.log(error);
    });
}


export default usersReducer;