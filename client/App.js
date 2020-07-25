import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider, createDataClient } from 'react-isomorphic-data';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorView from './components/ErrorView';
import Routes from './routes';

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
            <Routes />
          </Router>
        </HelmetProvider>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
