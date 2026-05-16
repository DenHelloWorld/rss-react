import { type ChangeEvent, type JSX } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange }: CheckboxProps): JSX.Element => {
  return (
    <label
      className={`button button--icon button--sm ${checked ? '' : 'button--outline'}`}
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
