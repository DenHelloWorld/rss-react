import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ErrorTrigger from '../ErrorTrigger/ErrorTrigger.tsx';
import { CONSOLE_ERROR_SPY } from '../../test-utils/console-spies.const.ts';
import { UI_TEST_TEXT } from '../../test-utils/ui-test-text.const.ts';

describe(ErrorBoundary.name, () => {
  const errorTriggerContent: RegExp = UI_TEST_TEXT.errorTrigger;
  const pushToResetContent: RegExp = UI_TEST_TEXT.pushToReset;
  const resetLabel = UI_TEST_TEXT.pushToReset.source;

  const setupScene = () => {
    const renderResult = render(
      <ErrorBoundary resetLabel={resetLabel}>
        <ErrorTrigger />
      </ErrorBoundary>
    );

    const triggerError = () => {
      fireEvent.click(
        screen.getByRole('button', { name: errorTriggerContent })
      );
    };

    const getResetButton = () =>
      screen.getByRole('button', { name: pushToResetContent });

    return { ...renderResult, triggerError, getResetButton };
  };

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary resetLabel={UI_TEST_TEXT.pushToReset.source}>
        <ErrorTrigger />
      </ErrorBoundary>
    );
    expect(
      screen.getByRole('button', { name: errorTriggerContent })
    ).toBeInTheDocument();
  });

  it('catches error and shows error message with reset button', () => {
    const { triggerError } = setupScene();
    triggerError();

    expect(
      screen.getByRole('button', { name: pushToResetContent })
    ).toBeInTheDocument();
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
