import React, { useReducer } from 'react';
import canUseDOM from '@helpers/dom/canUseDOM';
import { node, object } from 'prop-types';

import reducer from './reducer';

const getInitialState = () => {
  if (canUseDOM && window.__INITIAL_STATE__) {
    return window.__INITIAL_STATE__;
  }

  return {
    isBot: false,
    count: 0,
  };
};

export const GlobalContext = React.createContext(getInitialState());

const GlobalProvider = props => {
  const { children, initialState } = props;
  const initState = initialState || getInitialState();

  const [state, dispatch] = useReducer(reducer, initState);

  return <GlobalContext.Provider value={[state, dispatch]}>{children}</GlobalContext.Provider>;
};

GlobalProvider.propTypes = {
  children: node.isRequired,
  initialState: object,
};

GlobalProvider.defaultProps = {
  initialState: getInitialState(),
};

export default GlobalProvider;
