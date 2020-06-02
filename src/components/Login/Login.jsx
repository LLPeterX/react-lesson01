import React from 'react';
import s from './Login.module.css';
//import {Field, reduxForm} from 'redux-form';
import { reduxForm } from 'redux-form';
import { Input, createField } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import formStyle from '../common/FormControls/FormControls.module.css';

let LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required], Input)}
      {createField("Пароль", "password", [required], Input, { type: "password" })}
      {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "Запомнить меня")}
      {
        captchaUrl &&
        <div className={s.captcha}>
          <img src={captchaUrl} alt="Captcha" />
          {createField("Символы с картинки", "captcha", [required], Input)}
        </div>
      }
      {/* error message */}
      {error && <div className={formStyle.formError}>  {error} </div>}
      <div className={s.form_item}>
        <button>Login</button>
      </div>
    </form>
  );
}

let ReduxLoginForm = reduxForm({ form: 'login' })(LoginForm);

let Login = (props) => {
  // в onSunmit() передаются данные формы через объект formData
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  }

  // если мы уже авторизованы, делаем редирект на страницу своего профиля
  if (props.isAuth) return <Redirect to={'/profile'} />
  // иначе отображаем форму логина
  return (
    <div className={s.container}>
      <div className={s.title}>ВХОД</div>
      <div className={s.form}>
        <ReduxLoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login);