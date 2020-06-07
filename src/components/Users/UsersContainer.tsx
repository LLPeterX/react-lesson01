import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, toggleFollowingInProgress, requestUsers, onPageChanged } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader.jsx';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getPageSize,getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from '../../redux/UsersSelectors'
import { UserType } from '../../types/types';

type PropsType = {
  currentPage: number
  pageSize: number
  requestUsers: (currentPage:number, pageSize:number) => void
  onPageChanged: (pageNumber: number, pageSize:number) => void
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  follow: (userId:number) => void
  unfollow: (userId:number) => void
  followingInProgress: Array<number>
}


class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber:number) => {
    this.props.onPageChanged(pageNumber, this.props.pageSize);
  }

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
let mapStateToProps = (state:any) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
}
export default compose(connect(mapStateToProps,
  { follow, unfollow,  toggleFollowingInProgress,  requestUsers, onPageChanged }),withAuthRedirect)(UsersContainer)