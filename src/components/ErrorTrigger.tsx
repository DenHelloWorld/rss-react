import { type JSX, useState } from 'react';

const ErrorTrigger = (): JSX.Element => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('Test crash triggered by ErrorTrigger component!');
  }

  return (
    <button
      onClick={() => {
        setIsError(true);
      }}
      className="button button--warning"
    >
      <svg>
        <use href="/icons.svg#bomb" />
      </svg>
      triggers an error
    </button>
  );
};

export default ErrorTrigger;
