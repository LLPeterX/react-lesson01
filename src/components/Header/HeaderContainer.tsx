import React from 'react';
import { connect } from 'react-redux';
import {logout } from '../../redux/auth-reducer';
import Header from './Header';
import { AppStateType } from '../../redux/redux-store';

export type MapStateTtype = ReturnType<typeof mapStateToProps>
export type MapDispatchType = {
  logout: () => void
}

type PropsType = MapStateTtype & MapDispatchType // типы для isAuth, username, logout

class HeaderContainer extends React.Component<PropsType> {
  // componentDidMount() {
  //   this.props.getAuthUserData();
  // }


  render() {
    return <Header {...this.props}/>
  }
}

let mapStateToProps = (state:AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login as string|null
});



//export default connect(mapStateToProps,{getAuthUserData, logout})(HeaderContainer);
export default connect<MapStateTtype,MapDispatchType,{},AppStateType>(mapStateToProps,{logout})(HeaderContainer);