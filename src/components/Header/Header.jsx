import React from 'react';
import h from './Header.module.css';

const Header = () => {
  return (
    <header className={h.header}>
    <img src="./img/wolk.jpg" alt="Logo" />
  </header>
  );
}

export default Header;