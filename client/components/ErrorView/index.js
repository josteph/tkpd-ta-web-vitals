import React, { useCallback } from 'react';

const ErrorView = () => {
  const handleRetryClick = useCallback(() => {
    window.location.reload();
  }, []);

  const handleHomeClick = useCallback(() => {
    window.location = '/';
  }, []);

  return (
    <div className="error-wrapper">
      <h1>Oops.. Something went wrong.</h1>

      <div className="button-error-wrapper">
        <button type="button" onClick={handleRetryClick}>
          Retry
        </button>
        <button type="button" onClick={handleHomeClick}>
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default ErrorView;
