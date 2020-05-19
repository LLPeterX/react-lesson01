import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId;
    if(!userId) {
      userId = this.props.loggedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>;

  } // render()
} // class ProfileContainer

let mapStateToProps = (state) => {
  return ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  loggedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
})};

export default compose(connect(mapStateToProps,{getUserProfile, getStatus, updateStatus}), 
                       withRouter, withAuthRedirect)(ProfileContainer);