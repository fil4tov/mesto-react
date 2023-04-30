import React from 'react';
import headerLogo from '../assets/images/logo.svg'

const Header = () => {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип сайта" className="logo"/>
    </header>
  );
};

export default Header;