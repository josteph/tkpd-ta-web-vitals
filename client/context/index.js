import React from 'react';
import { node, object } from 'prop-types';

import GlobalProvider from './global';

function ContextProvider({ children, initialState }) {
  return <GlobalProvider initialState={initialState}>{children}</GlobalProvider>;
}

ContextProvider.propTypes = {
  children: node.isRequired,
  initialState: object,
};

ContextProvider.defaultProps = {
  initialState: undefined,
};

export default ContextProvider;
