import React from 'react';
import { node } from 'prop-types';

const withMaxWIdth = {
  maxWidth: '500px',
  margin: '0 auto',
};

const Layout = ({ children }) => {
  return (
    <div className="app" style={withMaxWIdth}>
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
