import { type ChangeEvent, type JSX, useState } from 'react';
import { KEYBOARD_KEYS } from '../consts/keyboard-keys.const.ts';

export interface SearchBarProps {
  initialValue: string;
  onSearch: (term: string) => void;
}

const SearchBar = ({ initialValue, onSearch }: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState(initialValue);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onHandleSearch = () => {
    const trimmedQuery = query.trim();

    setQuery(trimmedQuery);
    onSearch(trimmedQuery);
  };

  const onClear = () => {
    setQuery('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        <button onClick={onClear} className="button button--error button--icon">
          <svg>
            <use href="/icons.svg#search-off" />
          </svg>
        </button>
      )}
      <button
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
