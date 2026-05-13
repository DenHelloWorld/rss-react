import { useRouteError } from 'react-router';
import { type JSX } from 'react';

const BubbleError = (): JSX.Element => {
  throw useRouteError();
};

export default BubbleError;
