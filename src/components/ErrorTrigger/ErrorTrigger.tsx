'use client';

import { useState } from 'react';

const ErrorTrigger = () => {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error('Test crash triggered by ErrorTrigger component!');
  }

  const handleTrigger = () => {
    setIsError(true);
  };

  return (
    <button onClick={handleTrigger} className="button button--warning">
      <svg>
        <use href="/icons.svg#bomb" />
      </svg>
      triggers an error
    </button>
  );
};

export default ErrorTrigger;
