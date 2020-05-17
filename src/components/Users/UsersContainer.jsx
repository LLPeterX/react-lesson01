import React from 'react';
import { connect } from 'react-redux';
import { followSuceess, unfollowSuccess, toggleFollowingInProgress, getUsers, onPageChanged } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader.jsx';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class UsersContainer extends React.Component {
  componentDidMount() {
    console.log("UserContainer.componentDidMount, curPage = "+this.props.currentPage);
    this.props.getUsers(this.props.currentPage, this.props.pageSize);

  }

  // onPageChaged() через стрелочную функцию, чтобы сохранить контекст this
  onPageChanged = (pageNumber) => {
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

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
}

// let AuthRedirectComponent = withAuthRedirect(UsersContainer);

// export default UsersContainer = connect(mapStateToProps,
//   { follow: followSuceess, unfollow: unfollowSuccess,  toggleFollowingInProgress,  getUsers, onPageChanged })(AuthRedirectComponent);

export default compose(connect(mapStateToProps,
  { follow: followSuceess, unfollow: unfollowSuccess,  toggleFollowingInProgress,  getUsers, onPageChanged }),withAuthRedirect)(UsersContainer)