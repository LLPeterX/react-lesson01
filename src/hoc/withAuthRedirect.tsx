import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/redux-store';

let mapStateToPropsRedirect = (state:AppStateType) => ({ isAuth: state.auth.isAuth }); 

type MapPropsType = {isAuth: boolean}
type DispatchPropsType = {fake: () => void}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
 
  const RedirectComponent:React.FC<MapPropsType & DispatchPropsType> = (props) => {
      let {isAuth, fake, ...restProps} = props;
      if (isAuth)  return <WrappedComponent {...restProps as unknown as WCP} />;
      return <Redirect to={'/login'} />
  } 
   
  let ConnectedAuthRedirectComponent = connect<MapPropsType,DispatchPropsType,WCP,AppStateType>(mapStateToPropsRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
} // end withAuthRedirect
