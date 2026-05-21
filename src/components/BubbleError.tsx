import { useRouteError } from 'react-router';

const BubbleError = () => {
  throw useRouteError();
};

export default BubbleError;
