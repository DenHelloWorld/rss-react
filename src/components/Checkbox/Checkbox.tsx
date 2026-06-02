import { type ChangeEvent } from 'react';
import { useClickableBlock } from '../../hooks/useClickableBlock/useClickableBlock.ts';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps) => {
  const labelProps = useClickableBlock({
    stopPropagation: true,
  });

  return (
    <label
      {...labelProps}
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
