import type { Metadata } from 'next';
import AboutPage from '../../page-components/AboutPage/AboutPage';

export const metadata: Metadata = {
  title: 'About | RSS React App',
};

const AboutRoute = () => <AboutPage />;

export default AboutRoute;
