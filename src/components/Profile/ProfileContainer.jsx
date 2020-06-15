import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus,savePhoto, saveProfile } from '../../redux/profile-reducer.ts';
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.js';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.loggedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);

  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //debugger;
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile 
        profile={this.props.profile} 
        status={this.props.status} 
        updateStatus={this.props.updateStatus}
        isOwner={!!!this.props.match.params.userId} 
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    )
  } // render()
} // end class ProfileContainer

let mapStateToProps = (state) => {
  return ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    loggedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  })
};

export default compose(connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter, withAuthRedirect)(ProfileContainer);