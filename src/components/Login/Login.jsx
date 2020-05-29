import React from 'react';
import s from './Login.module.css';
//import {Field, reduxForm} from 'redux-form';
import {reduxForm} from 'redux-form';
import { Input, createField } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import formStyle from '../common/FormControls/FormControls.module.css';

let LoginForm = ({handleSubmit, error}) => {
  return (
    <form onSubmit={handleSubmit}> 
      {createField("Email","email",[required],Input)}
      {createField("Пароль","password",[required],Input, {type: "password"})}
      {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Запомнить меня")}
      {/* error message */}
      {error &&  <div className={formStyle.formError}>  {error} </div> }
      <div className={s.form_item}>
        <button>Login</button>
      </div>
    </form>
  );
}

let ReduxLoginForm = reduxForm({form: 'login'})(LoginForm);

let Login = (props) => {
  const onSubmit = (formData) => {
    // console.log("inside Login.onSubmit\nFormData:");
    // console.log('formData');
    props.login(formData.email, formData.password, formData.rememberMe);
  }

  if(props.isAuth)  return <Redirect to={'/profile'}/>

  return (
    <div className={s.container}>
      <div className={s.title}>ВХОД</div>
      <div className={s.form}>
        <ReduxLoginForm onSubmit={onSubmit}/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);