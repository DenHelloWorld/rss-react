'use client';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorPageProps) => (
  <div className="error-boundary-template">
    <p className="error-message">{error.message}</p>
    <button className="button button--error min-h-15" onClick={reset}>
      <svg>
        <use href="/icons.svg#refresh" />
      </svg>
      Push to Reset
    </button>
  </div>
);

export default ErrorPage;
