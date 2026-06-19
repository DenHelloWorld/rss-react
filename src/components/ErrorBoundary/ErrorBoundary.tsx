import { Component, type ErrorInfo, type ReactNode } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  resetLabel: string;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo.componentStack);
  }

  private resetErrors = () => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-template">
          <p className="error-message">{this.state.error?.message}</p>
          <button
            className="button button--error min-h-15"
            onClick={this.resetErrors}
          >
            <svg>
              <use href="/icons.svg#refresh" />
            </svg>
            {this.props.resetLabel}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
