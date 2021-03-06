import React from 'react';
import s from './Login.module.css';
//import {Field, reduxForm} from 'redux-form';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { Input, createField } from '../common/FormControls/FormControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom';
import formStyle from '../common/FormControls/FormControls.module.css';
import {AppStateType} from '../../redux/redux-store'

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}

type LoginFormNameType = Extract<keyof LoginFormValuesType, string>

type OwnPropsType = {
  captchaUrl: string|null
}

let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, OwnPropsType> & OwnPropsType> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormNameType>("Email", "email", [required], Input)}
      {createField<LoginFormNameType>("Пароль", "password", [required], Input, { type: "password" })}
      {createField<LoginFormNameType>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "Запомнить меня")}
      {
        captchaUrl &&
        <div className={s.captcha}>
          <img src={captchaUrl} alt="Captcha" />
          {createField<LoginFormNameType>("Символы с картинки", "captcha", [required], Input)}
        </div>
      }
      {/* error message */}
      {error && <div className={formStyle.formError}> {error} </div>}
      <div className={s.form_item}>
        <button>Login</button>
      </div>
    </form>
  );
}



let ReduxLoginForm = reduxForm<LoginFormValuesType, OwnPropsType>({ form: 'login' })(LoginForm);

type MapStateType = {
  isAuth: boolean
  captchaUrl: string|null
}

type MapDispatchType = {
  login: (email: string, password:string, rememberMe:boolean, captcha:string|null) => void
}

let Login: React.FC<MapStateType & MapDispatchType> = (props:MapStateType & MapDispatchType) => {
  // в onSunmit() передаются данные формы через объект formData
  const onSubmit = (formData:LoginFormValuesType) => {
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

const mapStateToProps = (state:AppStateType):MapStateType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, { login })(Login) as React.FC