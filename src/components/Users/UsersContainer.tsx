import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, actions, requestUsers, onPageChanged } from '../../redux/users-reducer';
//import { follow, unfollow, requestUsers, onPageChanged } from '../../redux/users-reducer';
//import {actions} from '../../redux/users-reducer'
import Users from './Users';
import Preloader from '../common/Preloader/Preloader.jsx';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/UsersSelectors'
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
}

// users: getUsers(state),
// pageSize: getPageSize(state),
// totalUsersCount: getTotalUsersCount(state),
// currentPage: getCurrentPage(state),
// isFetching: getIsFetching(state),
// followingInProgress: getFollowingInProgress(state)


// у нас объект actions
type MapDispatchToPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  toggleFollowingInProgress: (state: boolean, userId: number) => void
  requestUsers: (currentPage: number, pageSize: number) => void
  onPageChanged: (pageNumber: number, pageSize: number) => void
}


// OwnPropsType нигде не используется; для примера
type OwnPropsType = {
  title?: string
}
// кумулятивный тип для props класса. Тип состоит из двух других типов
type PropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<PropsType> {
  // после загрузки компоненты инициализируем значения тек. страницы и размера страницы из пропсов
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }

  // при изменении N страницы из Pginator'а отправляем команду наверх для получения новой порции юзеров
  onPageChanged = (pageNumber: number) => {
    this.props.onPageChanged(pageNumber, this.props.pageSize);
  }

  // ниже отображение списка пользователй. Пока он грузится (isGetching), показываем Preloader
  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> :
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            onPageChanged={this.onPageChanged}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
          />
        }
      </>
    );
  }
}

// функции ниже (getUsers, getPageSize и пр.) - из UsersSelectors. Они потом помогут в фильтрации пользователей
let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)

  };
}

// let mapDispatchToProps = (dispatch:any) => {
//   return {
//     follow,
//     unfollow,
//     toggleFollowingInProgress: (state:boolean, userId:number) => dispatch(actions.toggleFollowingInProgress(state,userId)),
//     requestUsers,
//     onPageChanged
//   };
// }

// Формируем мега-компоненту-обёртку над нашей. 
// С помощбю withAuthRedirect проверяем залогиненность
// если ОК, то делаем connect(), формируем пропсы и вызываем рендер компоненты.

 export default compose(
       connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps,
               { follow, unfollow,  toggleFollowingInProgress: actions.toggleFollowingInProgress,  requestUsers, onPageChanged })
   ,withAuthRedirect)(UsersContainer);
  
// export default compose(
//     connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStateType>(mapStateToProps, mapDispatchToProps)
// ,withAuthRedirect)(UsersContainer);
