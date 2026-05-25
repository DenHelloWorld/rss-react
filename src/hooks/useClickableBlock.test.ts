import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useClickableBlock } from './useClickableBlock.ts';
import type { KeyboardEvent, MouseEvent } from 'react';

describe('useClickableBlock', () => {
  const createMouseEvent = (overrides: Partial<MouseEvent<HTMLElement>> = {}) =>
    ({
      button: 0,
      target: document.createElement('div'),
      stopPropagation: vi.fn(),
      ...overrides,
    }) as unknown as MouseEvent<HTMLElement>;

  const createKeyboardEvent = (
    overrides: Partial<KeyboardEvent<HTMLElement>> = {}
  ) =>
    ({
      key: 'Enter',
      target: document.createElement('div'),
      ...overrides,
    }) as unknown as KeyboardEvent<HTMLElement>;

  describe('when allowedKeys is empty', () => {
    it('should call onClick on left-click', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: [] })
      );

      const { onClick: handleClick } = result.current;
      handleClick(createMouseEvent());
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when clicking on a button element', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: [] })
      );

      const button = document.createElement('button');
      const { onClick: handleClick } = result.current;
      handleClick(createMouseEvent({ target: button }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when clicking inside a button (closest match)', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: [] })
      );

      const button = document.createElement('button');
      const span = document.createElement('span');
      button.appendChild(span);
      const { onClick: handleClick } = result.current;
      handleClick(createMouseEvent({ target: span }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when clicking on an anchor element', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: [] })
      );

      const anchor = document.createElement('a');
      const { onClick: handleClick } = result.current;
      handleClick(createMouseEvent({ target: anchor }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should stop propagation on click', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: [] })
      );

      const stopPropagation = vi.fn();
      const event = createMouseEvent({ stopPropagation });
      const { onClick: handleClick } = result.current;
      handleClick(event);
      expect(stopPropagation).toHaveBeenCalledTimes(1);
    });

    it('should return correct accessibility props', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: [] })
      );

      const { role, tabIndex } = result.current;
      expect(role).toBe('button');
      expect(tabIndex).toBe(0);
    });

    it('should not handle keyDown when allowedKeys is empty', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: [] })
      );

      const { onKeyDown } = result.current;
      onKeyDown(createKeyboardEvent({ key: 'Enter' }));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('when allowedKeys has keys', () => {
    it('should call onClick when pressed key is in allowedKeys', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: ['Enter'] })
      );

      const { onKeyDown } = result.current;
      onKeyDown(createKeyboardEvent({ key: 'Enter' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when pressed key is not in allowedKeys', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: ['Escape'] })
      );

      const { onKeyDown } = result.current;
      onKeyDown(createKeyboardEvent({ key: 'Enter' }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when target is an INPUT element', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: ['Enter'] })
      );

      const input = document.createElement('input');
      const { onKeyDown } = result.current;
      onKeyDown(createKeyboardEvent({ target: input }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when target is a TEXTAREA element', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: ['Enter'] })
      );

      const textarea = document.createElement('textarea');
      const { onKeyDown } = result.current;
      onKeyDown(createKeyboardEvent({ target: textarea }));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should return early from handleClick when allowedKeys has items', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useClickableBlock({ onClick, allowedKeys: ['Enter'] })
      );

      const event = createMouseEvent();
      const { onClick: handleClick } = result.current;
      handleClick(event);
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
