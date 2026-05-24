import type { KEYBOARD_KEYS } from '../consts/keyboard-keys.const.ts';
import { type KeyboardEvent, type MouseEvent, useCallback } from 'react';

type KeyboardKey = (typeof KEYBOARD_KEYS)[keyof typeof KEYBOARD_KEYS];

interface ClickableReturnProps {
  role: 'button';
  tabIndex: number;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
}

interface ClickableConfig {
  onClick: (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  allowedKeys?: KeyboardKey[];
}

export const useClickableBlock = ({
  onClick,
  allowedKeys = [],
}: ClickableConfig): ClickableReturnProps => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (allowedKeys.length) {
        return;
      }

      const target = e.target as HTMLElement;

      if (target.closest('button, a, input, select, textarea')) {
        return;
      }

      if (e.button === 0) {
        onClick(e);
      }
    },
    [onClick, allowedKeys]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (
        allowedKeys.length > 0 &&
        allowedKeys.includes(e.key as KeyboardKey)
      ) {
        onClick(e);
      }
    },
    [onClick, allowedKeys]
  );

  return {
    role: 'button',
    tabIndex: 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
};
