import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ErrorTrigger from './ErrorTrigger.tsx';
import { CONSOLE_ERROR_SPY } from '../test-utils/console-spies.const.ts';
import { UI_TEST_TEXT } from '../test-utils/ui-test-text.const.ts';

describe(ErrorBoundary.name, () => {
  const errorTriggerContent: RegExp = UI_TEST_TEXT.errorTrigger;
  const errorBoundaryContent: RegExp = UI_TEST_TEXT.boundaryWorks;
  const pushToResetContent: RegExp = UI_TEST_TEXT.pushToReset;

  const setupScene = (fallback?: React.ReactNode) => {
    const renderResult = render(
      <ErrorBoundary fallback={fallback}>
        <ErrorTrigger />
      </ErrorBoundary>
    );

    const triggerError = () => {
      fireEvent.click(
        screen.getByRole('button', { name: errorTriggerContent })
      );
    };

    const getDefaultFallbackContainer = () =>
      screen.getByText(errorBoundaryContent).parentElement;

    const getResetButton = () =>
      screen.getByRole('button', { name: pushToResetContent });

    return {
      ...renderResult,
      triggerError,
      getDefaultFallbackContainer,
      getResetButton,
    };
  };

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ErrorTrigger />
      </ErrorBoundary>
    );
    expect(
      screen.getByRole('button', { name: errorTriggerContent })
    ).toBeInTheDocument();
  });

  it('renders custom fallback', () => {
    const { triggerError } = setupScene('Custom Error');
    triggerError();

    expect(screen.getByText('Custom Error')).toBeInTheDocument();
  });

  it('catches error and logs it to console', () => {
    const { triggerError } = setupScene();
    triggerError();

    expect(CONSOLE_ERROR_SPY).toHaveBeenCalled();
  });

  it('clears the error state and recovers on reset button click', () => {
    const { triggerError, getResetButton } = setupScene();
    triggerError();

    fireEvent.click(getResetButton());

    expect(
      screen.getByRole('button', { name: errorTriggerContent })
    ).toBeInTheDocument();
  });
});
