'use client';

import { type ChangeEvent, useState, type KeyboardEvent } from 'react';
import { KEYBOARD_KEYS } from '../../consts/keyboard-keys.const.ts';

export type SearchBarProps = {
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

  const onHandleSearch = () => {
    const trimmedQuery = query.trim();

    setQuery(trimmedQuery);
    onSearch(trimmedQuery);
  };

  const onHandleRefetch = () => {
    onRefetch();
  };

  const onClear = () => {
    setQuery('');
    onSearch('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER) {
      onHandleSearch();
    }
  };

  return (
    <div className="container mx-auto flex gap-4 flex-wrap">
      <input
        value={query}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="Search items..."
        className="input"
      />
      {query && (
        <button
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
        disabled={isDisabled}
        onClick={onHandleRefetch}
        className="button button--warning button--icon"
      >
        <svg>
          <use href="/icons.svg#refresh" />
        </svg>
      </button>

      <button
        disabled={isDisabled}
        onClick={onHandleSearch}
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
