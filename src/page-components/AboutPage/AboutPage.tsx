import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { URLs } from '../../consts/urls.const.ts';
import type { Locale } from '../../consts/locales.const.ts';

type Props = { locale: Locale };

const AboutPage = async ({ locale }: Props) => {
  const t = await getTranslations({ locale, namespace: 'AboutPage' });

  return (
    <section className="mx-auto container shell">
      <h1 className="title text-left">{t('title')}</h1>
      <div className="about-content">
        <p className="about-description">
          {t('description')}{' '}
          <a
            href={URLs.articApiDocs}
            target="_blank"
            rel="noopener noreferrer"
            className="link link--active"
          >
            <svg>
              <use href="/icons.svg#open-in-new" />
            </svg>
            {t('apiLinkLabel')}
          </a>
          .
        </p>

        <div className="about-author-section">
          <h2 className="about-subtitle">{t('authorTitle')}</h2>

          <div className="about-avatar-wrapper">
            <Image
              src={URLs.authorGithubAvatar}
              alt={t('avatarAlt')}
              loading="eager"
              width={280}
              height={280}
              className="m-auto"
            />
          </div>

          <p className="about-author-text">
            {t('authorText')}{' '}
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
            {t('authorSuffix')}
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
            {t('courseButton')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
