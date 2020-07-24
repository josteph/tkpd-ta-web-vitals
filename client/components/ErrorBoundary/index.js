import React, { PureComponent } from 'react';
import { bool, func, node, string } from 'prop-types';

class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: node,
    debug: bool,
    errorMessage: string,
    render: func,
  };

  static defaultProps = {
    children: null,
    debug: false,
    errorMessage: '',
    render: null,
  };

  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    const { debug } = this.props;

    if (debug) {
      console.groupCollapsed(`Error occured!`);
      console.error(`
        [ErrorBoundary] Error message: ${error.message}
        [ErrorBoundary] Error stack: ${error.stack}
        [ErrorBoundary] Component stack: ${info.componentStack}
      `);
      console.groupEnd();
    }

    this.setState({ hasError: true });
  }

  defaultRender = () => {
    const message = this.props.errorMessage || 'Sorry, something went wrong.';

    return <div>{message}</div>;
  };

  render() {
    const { children, render } = this.props;
    const renderError = render || this.defaultRender;

    return this.state.hasError ? renderError() : children;
  }
}

export default ErrorBoundary;
