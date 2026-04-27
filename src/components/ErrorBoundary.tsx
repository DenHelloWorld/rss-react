import React, { type ReactNode } from 'react';

export interface ErrorBoundaryState {
  isError: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { isError: false };
  }

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  #resetErrors = () => {
    this.setState({
      isError: false,
    });
  };

  render() {
    if (this.state.isError) {
      return (
        this.props.fallback || (
          <div className="error-boundary-template">
            <p className="error-message">
              Error boundary works! See the console for details.
            </p>
            <button
              className="button button--error"
              onClick={this.#resetErrors}
            >
              <svg>
                <use href="/icons.svg#refresh" />
              </svg>
              Reset
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
