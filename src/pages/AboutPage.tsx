import { URLs } from '../consts/urls.const.ts';
import LazyImage from '../components/LazyImage.tsx';

const AboutPage = () => {
  return (
    <section className="mx-auto container shell">
      <h1 className="title text-left">About the Project</h1>
      <div className="about-content">
        <p className="about-description">
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

        <div className="about-author-section">
          <h2 className="about-subtitle">Author</h2>

          <div className="about-avatar-wrapper">
            <LazyImage src={URLs.authorGithubAvatar} alt="GitHub Avatar" />
          </div>

          <p className="about-author-text">
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
