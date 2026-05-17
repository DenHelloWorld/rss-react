import { type JSX } from 'react';
import { useArtworkSelection } from '../hooks/useArtworkSelection.ts';
import { useArtworksDownload } from '../hooks/useArtworksDownload.ts';

const Flyout = (): JSX.Element => {
  const { count, selectedEntities } = useArtworkSelection();
  const { clearAll } = useArtworkSelection();
  const { downloadAsCsv } = useArtworksDownload();

  const handleDownload = () => {
    downloadAsCsv(selectedEntities);
  };

  return (
    <div
      className={`flex items-center gap-4 fixed bottom-2 right-2 bg-white/50 backdrop-blur-md rounded-lg px-4 py-2 z-1 border border-gray-100 transition-opacity ${count ? 'opacity-110' : 'opacity-0 pointer-events-none'}`}
    >
      <span className="text-xs text-gray-500">Selected: {count}</span>

      <button onClick={clearAll} className="button button--sm button--error">
        <svg>
          <use href="/icons.svg#remove-selection" />
        </svg>
        Unselect all
      </button>

      <button
        onClick={handleDownload}
        className="button button--sm button--success"
      >
        <svg>
          <use href="/icons.svg#download" />
        </svg>
        Download
      </button>
    </div>
  );
};

export default Flyout;
