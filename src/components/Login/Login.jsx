import React from 'react';
import s from './Login.module.css';
import {Field, reduxForm} from 'redux-form';
import { Input } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import formStyle from '../common/FormControls/FormControls.module.css';

let LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}> 
      <div className={s.form_item}>
        <Field name={"email"} type="text" placeholder={"Login"} component={Input}
        validate={[required]}/>
      </div>
      <div className={s.form_item}>
        <Field name={"password"} type="password" placeholder={"Password"} component={Input}
        validate={[required]}/>
      </div>
      <div className={s.form_item}>
        <Field name={"rememberMe"} type={"checkbox"} component={Input}/> Запомнить меня
      </div>
      {/* error message */}
      { props.error &&  <div className={formStyle.formError}>  {props.error} </div> }
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