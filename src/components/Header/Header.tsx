import React from 'react';
import s from './Header.module.css';
import volk from '../../assets/images/pirat.png';
import { NavLink } from 'react-router-dom';
import {MapStateTtype, MapDispatchType} from './HeaderContainer'

type PropsType = MapStateTtype & MapDispatchType

const Header: React.FC<PropsType> = (props) => {
  return (
    <header className={s.header}>
      <div className={s.header__logotype}>
        <img src={volk} alt="Logo" className={s.logo} />
        <div className={s.title}>-= Одноглазники =-</div>
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