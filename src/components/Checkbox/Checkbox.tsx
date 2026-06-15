'use client';

import {
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
} from 'react';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';

type CheckboxProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      e.stopPropagation();
    },
    []
  );

  const clickableBlockProps = useClickableBlock({ onClick: handleClick });

  return (
    <label
      {...clickableBlockProps}
      className={`button button--icon w-8 h-8 ${checked ? '' : 'button--outline'}`}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />

      {checked && (
        <svg>
          <use href="/icons.svg#check" />
        </svg>
      )}

      <span className="sr-only">Select</span>
    </label>
  );
};

export default Checkbox;
