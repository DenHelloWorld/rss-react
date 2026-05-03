import React from 'react';
import { KEYBOARD_KEYS } from '../consts/keyboard-keys.const.ts';

export interface SearchBarProps {
  initialValue: string;
  onSearch: (term: string) => void;
}

export interface SearchBarState {
  query: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      query: props.initialValue,
    };
  }

  #onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    this.setState({ query });
  };

  #onSearch = () => {
    const query = this.state.query.trim();

    this.setState({ query }, () => {
      this.props.onSearch(query);
    });
  };

  #onClear = () => {
    this.setState({ query: '' });
  };

  #onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEYS.ENTER) {
      this.#onSearch();
    }
  };

  render() {
    return (
      <>
        <div className="container mx-auto flex gap-4 px-4 flex-wrap">
          <input
            value={this.state.query}
            onChange={this.#onInputChange}
            onKeyDown={this.#onKeyDown}
            type="text"
            placeholder="Search items..."
            className="input"
          />
          {this.state.query && (
            <button
              onClick={this.#onClear}
              className="button button--error button--icon"
            >
              <svg>
                <use href="/icons.svg#search-off" />
              </svg>
            </button>
          )}
          <button
            onClick={this.#onSearch}
            className="button button--success button--icon"
          >
            <svg>
              <use href="/icons.svg#search-icon" />
            </svg>
          </button>
        </div>
      </>
    );
  }
}

export default SearchBar;
