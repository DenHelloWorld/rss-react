import type { JSX } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../consts/routes.const.ts';

const NotFoundPage = (): JSX.Element => {
  return (
    <div className="m-auto flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="subtitle">404 - Page Not Found</h1>
      <p className="text-center">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to={ROUTES.ROOT.path} className="button">
        <svg>
          <use href="/icons.svg#refresh" />
        </svg>
        Return to {ROUTES.ROOT.label}
      </Link>
    </div>
  );
};

export default NotFoundPage;
