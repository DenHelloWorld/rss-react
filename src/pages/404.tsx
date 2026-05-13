import type { JSX } from 'react';
import { Link } from 'react-router';
import { ROUTES } from '../consts/routes.const.ts';

const NotFoundPage = (): JSX.Element => {
  return (
    <section className="mx-auto container w-full results-container">
      <h1 className="subtitle text-left">404 - Page Not Found</h1>

      <div className=" text-center flex flex-col items-center gap-4 w-full md:max-w-1/2 mx-auto">
        <p className="text-center">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to={ROUTES.ROOT.path} className="button w-fit">
          <svg>
            <use href="/icons.svg#refresh" />
          </svg>
          Return to {ROUTES.ROOT.label}
        </Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
