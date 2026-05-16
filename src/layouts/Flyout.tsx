import { type JSX } from 'react';
import { useArtworkSelection } from '../hooks/useArtworkSelection.ts';

const Flyout = (): JSX.Element => {
  const { count } = useArtworkSelection();

  return <div className="fixed bottom-4 right-4">{count}</div>;
};

export default Flyout;
