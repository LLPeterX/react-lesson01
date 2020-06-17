import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const withAuthRedirect = (WrappedComponent:React.ComponentType) => {
  
  class RedirectComponent extends React.Component {
    render() {
      if (this.props.isAuth)
        return <WrappedComponent {...this.props} />;
      else
        return <Redirect to={'/login'} />;
    } // render
  } // class
  
  let mapStateToPropsRedirect = (state) => ({ isAuth: state.auth.isAuth }); 

  let RedicrectedAuthComponent = connect(mapStateToPropsRedirect)(RedirectComponent);

  return RedicrectedAuthComponent;
}

