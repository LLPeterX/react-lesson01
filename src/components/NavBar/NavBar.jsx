import React from 'react';
import nav from './NavBar.module.css';
//console.log(nav);
const NavBar = () => {
  return (
    <nav className={nav.nav}>
        <div className={nav.item}><a href="/">Профиль</a></div>
        <div className={`${nav.item} ${nav.active}`}><a href="/">Сообщения</a></div>
        <div className={nav.item}><a href="/">Новости</a></div>
        <div className={nav.item}><a href="/">Музыка</a></div>
        <div className={nav.item}><a href="/">Настройки</a></div>
      </nav>
  );
}

export default NavBar;