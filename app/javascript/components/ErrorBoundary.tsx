import React from 'react';
import _isEqual from 'lodash/isEqual';

type TProps = {
  children?: React.ReactElement,
  fallback: boolean,
  fallbackComponent?: React.ReactElement,
  resetOnChanges?: Record<string, unknown>
};

type TState = {
  hasError: boolean
};

type TErrorInfo = {
  componentStack: string,
};

class ErrorBoundary extends React.Component<TProps, TState> {
  state = { hasError: false };
  static defaultProps = { fallback: true };

  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: TErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  componentDidUpdate(prevProps: TProps) {
    if (
      this.state.hasError &&
      (this.props.resetOnChanges || prevProps.resetOnChanges) &&
      !_isEqual(prevProps.resetOnChanges, this.props.resetOnChanges)
    ) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallbackComponent || <h1>Something went wrong.</h1>;
      } else {
        return null;
      }
    }

    return this.props.children || null;
  }
}

export default ErrorBoundary;
