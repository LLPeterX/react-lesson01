import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer'
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';
import { ThunkType } from '../../redux/profile-reducer'


type MapPropsType = ReturnType<typeof mapStateToProps> // тип для mapStateToProps

type MapDispatchType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (statusText: string | null) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}
// типы для Router
type PathParamsType = {
  userId: string // да, string, а не number
}
type RouterPropsType = RouteComponentProps<PathParamsType>

type PropsType = MapPropsType & MapDispatchType & RouterPropsType

// основной класс
class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId; // преобразуем в Number или, если userId пустой, в Boolean false
    if (!userId) {
      // если userId не указан в URL, пробуем получить ID залогинненного пользователя
      userId = this.props.loggedUserId;
      // если пользователь не залогинен, перекидываем на страницу Login 
      // (почему не Redirect на LoginPage?)
      if (!userId) {
        // todo: replace push with Redirect
        this.props.history.push("/login");
      }
    }
    if (userId) {
      this.props.getUserProfile(userId);
      this.props.getStatus(userId);
    } else {
      console.error("ProfileContainer.refreshProfile: userId must be specified");
    }

  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
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

let mapStateToProps = (state: AppStateType) => {
  return ({
    profile: state.profilePage.profile as ProfileType | null,
    status: state.profilePage.status,
    loggedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  })
};

export default compose<React.ComponentType>(connect<MapPropsType, MapDispatchType, {}, AppStateType>(
  mapStateToProps,
  { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }
), withRouter, withAuthRedirect)(ProfileContainer);