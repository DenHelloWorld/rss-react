import type { JSX } from 'react';
import { URLs } from '../consts/urls.const.ts';
import LazyImage from '../components/LazyImage.tsx';

const AboutPage = (): JSX.Element => {
  return (
    <section className="mx-auto container shell">
      <h1 className="title text-left">About the Project</h1>
      <div className="text-center flex flex-col gap-4 w-full md:max-w-1/2 mx-auto">
        <p className="text-lg text-gray-700">
          This application was developed as part of the React course. It allows
          users to explore the Art Institute of Chicago&#39;s collection using
          their{' '}
          <a
            href={URLs.articApiDocs}
            target="_blank"
            rel="noopener noreferrer"
            className="link link--active"
          >
            <svg>
              <use href="/icons.svg#open-in-new" />
            </svg>
            public API
          </a>
          .
        </p>

        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-xl font-bold text-gray-800">Author</h2>

          <div className="shadow h-70 aspect-square rounded-xl overflow-hidden">
            <LazyImage src={URLs.authorGithubAvatar} alt="GitHub Avatar" />
          </div>

          <p className="text-gray-600">
            Developed by{' '}
            <a
              href={URLs.authorGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="link link--active"
            >
              <svg>
                <use href="/icons.svg#open-in-new" />
              </svg>
              DenHelloWorld
            </a>
            , a student at RS School.
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <a
            href={URLs.rssReactCourse}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            <svg>
              <use href="/icons.svg#open-in-new" />
            </svg>
            RS School React Course
          </a>
        </div>
      </div>
    </section>
  );
};
export default AboutPage;
