import React from 'react';
import s from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  
  // ниже плохо работает. Не видит props.menu
  //debugger;
  //let navItems = props.menu.map(e => {
  //   return (
  //     <div className={s.item} key={e.key}>
  //       <NavLink to={e.link}>{e.name}</NavLink>
  //     </div>);
  // });


  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>Профиль</NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>Сообщения</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/users" activeClassName={s.activeLink}>Пользователи</NavLink>
      </div>

      <div className={s.item}><a href="/">Новости</a></div>
      <div className={s.item}><a href="/">Музыка</a></div>
      <div className={s.item}><a href="/">Настройки</a></div>
    </nav>
    // <nav className={s.nav}>
    //   {navItems}
    // </nav>
  );
}

export default NavBar;