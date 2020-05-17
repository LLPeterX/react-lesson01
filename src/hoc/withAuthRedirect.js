import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const withAuthRedirect = (Component) => {
  
  class RedirectComponent extends React.Component {
    render() {
      if (this.props.isAuth)
        return <Component {...this.props} />;
      else
        return <Redirect to='/login' />;
    } // render
  } // class
  
  let mapStateToPropsRedirect = (state) => ({ isAuth: state.auth.isAuth }); 

  let RedicrectedAuthComponent = connect(mapStateToPropsRedirect)(RedirectComponent);

  return RedicrectedAuthComponent;
}

