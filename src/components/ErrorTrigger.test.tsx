import { Component, type ErrorInfo, type ReactNode } from 'react';
import ErrorTrigger from './ErrorTrigger.tsx';
import { render, screen, fireEvent } from '@testing-library/react';
import { UI_TEXT } from '../test-utils/ui-text.const.ts';
import { CONSOLE_ERROR_SPY } from '../test-utils/console-spies.const.ts';

class TestBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {}

  render() {
    if (this.state.hasError) {
      return <h1>Caught</h1>;
    }
    return this.props.children;
  }
}

describe(ErrorTrigger.name, () => {
  const errorTriggerContent = UI_TEXT.errorTrigger;

  it('renders the trigger button initially', () => {
    render(<ErrorTrigger />);

    const button = screen.getByRole('button', { name: errorTriggerContent });

    expect(button).toBeInTheDocument();
  });

  it('crashes and triggers boundary on click', () => {
    render(
      <TestBoundary>
        <ErrorTrigger />
      </TestBoundary>
    );

    const button = screen.getByRole('button', { name: errorTriggerContent });

    fireEvent.click(button);

    expect(screen.getByText('Caught')).toBeInTheDocument();

    expect(CONSOLE_ERROR_SPY).toHaveBeenCalled();
  });
});
