import { createBrowserRouter } from 'react-router';
import { ROUTES } from '../consts/routes.const.ts';
import AboutPage from '../pages/AboutPage/AboutPage.tsx';
import App from '../App.tsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.tsx';
import BubbleError from '../components/BubbleError/BubbleError.tsx';
import DetailsPage from '../pages/DetailsPage/DetailsPage.tsx';
import ArtworkResultsLayout from '../layouts/ArtworkResultsLayout/ArtworkResultsLayout.tsx';
import { artworksParamsLoader } from './artworksParamsLoader.ts';

export const router = createBrowserRouter([
  // TODO: MainPage ?
  {
    path: ROUTES.ROOT.path,
    element: <App />,
    errorElement: <BubbleError />,
    children: [
      {
        path: '',
        loader: artworksParamsLoader,
        element: <ArtworkResultsLayout />,
        children: [
          {
            path: `${ROUTES.DETAILS.path}/:id`,
            element: <DetailsPage />,
          },
        ],
      },
      {
        path: ROUTES.ABOUT.path,
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
