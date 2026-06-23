import { type ReactNode } from 'react';
import LazyImage from '../../components/LazyImage/LazyImage';

type NotFoundPageProps = {
  title: string;
  description: string;
  returnButton: ReactNode;
};

const NotFoundPage = ({
  title,
  description,
  returnButton,
}: NotFoundPageProps) => (
  <section className="mx-auto container shell">
    <h1 className="title text-left">{title}</h1>
    <div className="text-center flex flex-col items-center gap-4 w-full md:max-w-1/2 mx-auto">
      <div className="w-48 h-54">
        <LazyImage
          src="/404.webp"
          alt={description}
          loading="eager"
          unoptimized={false}
          quality={90}
          width={192}
          height={216}
        />
      </div>
      <p className="text-center">{description}</p>
      {returnButton}
    </div>
  </section>
);

export default NotFoundPage;
