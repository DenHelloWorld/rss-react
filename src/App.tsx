import './App.css';
import React from 'react';
import SearchBar from './components/SearchBar.tsx';
import Header from './components/Header.tsx';
import {
  localStorageService,
  STORAGE_KEYS,
} from './services/local-storage.service.ts';

/*
 * <svg className="icon" role="presentation" aria-hidden="true">
 *    <use href="/icons.svg#documentation-icon"></use>
 * </svg>
 **/

interface AppState {
  searchTerm: string;
  isLoading: boolean;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);

    const searchTerm =
      localStorageService.getItem<string>(STORAGE_KEYS.SEARCH_TERM) || '';

    this.state = {
      searchTerm,
      isLoading: false,
    };
  }
  #handleSearch = (value: string) => {
    const searchTerm = value.trim();

    if (searchTerm !== this.state.searchTerm) {
      localStorageService.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
      this.setState({ searchTerm });
    }
  };

  render() {
    return (
      <div className="app-wrapper">
        {/* Header / Search Section */}
        <Header>
          <SearchBar
            initialValue={this.state.searchTerm}
            onSearch={this.#handleSearch}
          />
        </Header>

        {/* Main / Results Section */}
        <main className="flex-1 w-full p-4 md:p-8">
          <div className="container mx-auto">
            <div className="results-container">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Search Results
              </h2>
              <div className="cards-grid">
                {/* Cards will be here */}
                <p className="text-gray-400 italic">
                  No items. Start searching!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
