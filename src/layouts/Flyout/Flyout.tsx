'use client';

import { useArtworkSelection } from '../../hooks/useArtworkSelection/useArtworkSelection.ts';
import { useArtworksDownload } from '../../hooks/useArtworksDownload/useArtworksDownload.ts';

const Flyout = () => {
  const { count, selectedEntities, clearAll } = useArtworkSelection();
  const { downloadAsCsv } = useArtworksDownload();

  const handleDownload = () => {
    downloadAsCsv(selectedEntities);
  };

  return (
    <div className="flyout-panel">
      <span className="flyout-count">Selected: {count}</span>

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
