import React from 'react';
import logo from '../../assets/logo.svg';

const headerStyle = {
  height: '65px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: '1px solid #fff',
  backgroundColor: '#333',
  color: '#fff',
};

const imageStyle = {
  height: '40px',
  width: 'auto',
};

const Header = () => {
  return (
    <div className="header" style={headerStyle}>
      <img src={logo} alt="logo" style={imageStyle} />
      <h1>App Sample</h1>
    </div>
  );
};

export default Header;
