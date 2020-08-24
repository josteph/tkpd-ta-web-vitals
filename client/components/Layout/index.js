import React from 'react';
import { node } from 'prop-types';
import { Helmet } from 'react-helmet-async';

const withMaxWIdth = {
  maxWidth: '500px',
  margin: '0 auto',
};

const Layout = ({ children }) => {
  return (
    <div className="app" style={withMaxWIdth}>
      <Helmet encodeSpecialCharacters>
        <title>Tokopedia Academy App by Web Platform</title>
      </Helmet>
    
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
