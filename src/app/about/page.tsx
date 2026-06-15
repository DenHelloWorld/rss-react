import type { Metadata } from 'next';
import AboutPage from '../../page-components/AboutPage/AboutPage';

export const metadata: Metadata = {
  title: 'About | Art Institute of Chicago',
};

const AboutRoute = () => <AboutPage />;

export default AboutRoute;
