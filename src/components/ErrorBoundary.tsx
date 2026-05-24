import React, { type ReactNode } from 'react';

export interface ErrorBoundaryState {
  hasError: boolean;
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
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo.componentStack);
  }

  private resetErrors = () => {
    this.setState({
      hasError: false,
    });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
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
