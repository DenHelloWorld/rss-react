import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from './Checkbox';

describe(Checkbox.name, () => {
  it('should render unchecked state', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Checkbox checked={false} onChange={onChange} />
    );

    const input = screen.getByRole('checkbox');

    expect(input).not.toBeChecked();
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });

  it('should render checked state with icon', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Checkbox checked={true} onChange={onChange} />
    );

    const input = screen.getByRole('checkbox');

    expect(input).toBeChecked();
    expect(screen.getByText('Select')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should call onChange when checkbox is clicked', () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
