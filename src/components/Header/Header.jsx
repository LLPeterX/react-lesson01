import React from 'react';
import s from './Header.module.css';
import volk from '../../assets/images/wolk.jpg';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.header__logotype}>
        <img src={volk} alt="Logo" className={s.logo} />
        <div className={s.title}>Моя соцыальная сеть</div>
      </div>
      <div className={s.loginBlock}>
        {/* В зависимости от значения isAuth отоюражаем либо имя пользователя, либо "Вход" */}
        {props.isAuth
          ? <>
            <div>{props.login}</div>
            <div><button onClick={props.logout}>Выход</button></div>
          </>
          : <NavLink to={'/login'}>Вход</NavLink>}
      </div>


    </header>
  );
}

export default Header;