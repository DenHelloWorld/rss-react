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

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { isError: true };
  }

  componentDidCatch(error: Error): void {
    console.error(error);
  }

  private resetErrors = () => {
    this.setState({
      isError: false,
    });
  };

  render(): React.ReactNode {
    if (this.state.isError) {
      return (
        this.props.fallback ?? (
          <div className="error-boundary-template">
            <p className="error-message">
              Error boundary works! See the console for details.
            </p>
            <button
              className="button button--error min-h-15"
              onClick={this.resetErrors}
            >
              <svg>
                <use href="/icons.svg#refresh" />
              </svg>
              Push to Reset
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
