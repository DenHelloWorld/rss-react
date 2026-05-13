import { createBrowserRouter } from 'react-router';
import { ROUTES } from './consts/routes.const.ts';
import AboutPage from './pages/AboutPage.tsx';
import App from './App.tsx';
import NotFoundPage from './pages/404.tsx';
import BubbleError from './components/BubbleError.tsx';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT.path,
    element: <App />,
    errorElement: <BubbleError />,
    children: [
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
