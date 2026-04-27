import React, { type ReactNode } from 'react';
import { KEYBOARD_KEYS } from '../consts/keyboard-keys.const.ts';

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

  #onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ESCAPE || e.key === KEYBOARD_KEYS.ESC) {
      this.#resetErrors();
    }
  };

  render() {
    if (this.state.isError) {
      return (
        this.props.fallback || (
          <div
            className="error-boundary-template"
            onKeyDown={this.#onKeyDown}
            tabIndex={0}
            ref={(el) => el?.focus()}
          >
            <p className="error-message">
              Error boundary works! See the console for details.
            </p>
            <button
              className="button button--error min-h-15"
              onClick={this.#resetErrors}
            >
              <svg>
                <use href="/icons.svg#refresh" />
              </svg>
              Push to Reset or press Esc
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
