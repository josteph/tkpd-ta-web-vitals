import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import ContextProvider from '@context';
import ErrorBoundary from '@components/ErrorBoundary';
import ErrorView from '@components/ErrorView';

import Routes from '@route-gateway';

function App() {
  return (
    <ErrorBoundary debug render={() => <ErrorView />}>
      <HelmetProvider>
        <Router>
          <ContextProvider>
            <Routes />
          </ContextProvider>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
