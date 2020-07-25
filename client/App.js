import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '@route-gateway';
import { DataProvider, createDataClient } from 'react-isomorphic-data';

import ContextProvider from '@context';
import ErrorBoundary from '@components/ErrorBoundary';
import ErrorView from '@components/ErrorView';

const dataClient = createDataClient({
  initialCache: window.__cache || {},
  ssr: false,
});

function App() {
  return (
    <ErrorBoundary debug render={() => <ErrorView />}>
      <DataProvider client={dataClient}>
        <HelmetProvider>
          <Router>
            <ContextProvider>
              <Routes />
            </ContextProvider>
          </Router>
        </HelmetProvider>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
