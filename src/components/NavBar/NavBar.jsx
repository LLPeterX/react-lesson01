import React from 'react';
import s from './NavBar.module.css';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className={s.nav}>
        <div className={s.item}>
            <NavLink to="/profile" activeClassName={s.activeLink}>Профиль</NavLink>
        </div>
        <div className={`${s.item} ${s.active}`}>
            <NavLink to="/dialogs" activeClassName={s.activeLink}>Сообщения</NavLink>
        </div>
        <div className={s.item}><a href="/">Новости</a></div>
        <div className={s.item}><a href="/">Музыка</a></div>
        <div className={s.item}><a href="/">Настройки</a></div>
      </nav>
  );
}

export default NavBar;