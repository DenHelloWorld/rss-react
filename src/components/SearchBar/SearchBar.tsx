'use client';

import { type ChangeEvent, useState } from 'react';

type SearchBarProps = {
  initialValue: string;
  onSearch: (term: string) => void;
  onRefetch: () => void;
  isDisabled?: boolean;
};

const SearchBar = ({
  initialValue,
  onSearch,
  onRefetch,
  isDisabled = false,
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="container mx-auto flex gap-4 flex-wrap">
      <input
        name="query"
        value={query}
        onChange={onInputChange}
        type="text"
        placeholder="Search items..."
        className="input"
      />
      {query && (
        <button
          type="button"
          disabled={isDisabled}
          onClick={onClear}
          className="button button--error button--icon"
        >
          <svg>
            <use href="/icons.svg#search-off" />
          </svg>
        </button>
      )}
      <button
        type="button"
        disabled={isDisabled}
        onClick={onRefetch}
        className="button button--warning button--icon"
      >
        <svg>
          <use href="/icons.svg#refresh" />
        </svg>
      </button>
      <button
        type="submit"
        disabled={isDisabled}
        className="button button--success button--icon"
      >
        <svg>
          <use href="/icons.svg#search-icon" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
