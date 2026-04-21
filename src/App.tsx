import './App.css';
import React from 'react';
import SearchBar from './components/SearchBar.tsx';
import Header from './components/Header.tsx';
import {
  localStorageService,
  STORAGE_KEYS,
} from './services/local-storage.service.ts';
import { AICApiService, type AICArtwork } from './services/AICApiService.ts';
import AICCard from './components/AICCard.tsx';
import { ResultsContainer } from './components/ResultsContainer.tsx';

/*
 * <svg className="icon" role="presentation" aria-hidden="true">
 *    <use href="/icons.svg#documentation-icon"></use>
 * </svg>
 **/

interface AppState {
  searchTerm: string;
  isLoading: boolean;
  arts: AICArtwork[] | null;
  errorMessage: string | null;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);

    const searchTerm =
      localStorageService.getItem<string>(STORAGE_KEYS.SEARCH_TERM) || '';

    this.state = {
      arts: null,
      searchTerm,
      isLoading: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    await this.#performSearch(this.state.searchTerm);
  }

  #performSearch = async (query: string) => {
    this.setState({ isLoading: true, errorMessage: null });

    try {
      const response = await AICApiService.search(query);
      this.setState({ arts: response.data });
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'An unknown error occurred';

      this.setState({
        errorMessage,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  #handleSearch = (value: string) => {
    const searchTerm = value.trim();

    if (searchTerm !== this.state.searchTerm) {
      localStorageService.setItem(STORAGE_KEYS.SEARCH_TERM, searchTerm);
      this.setState({ searchTerm }, async () => {
        await this.#performSearch(searchTerm);
      });
    }
  };

  render() {
    const { arts, isLoading, errorMessage, searchTerm } = this.state;

    return (
      <div className="app-wrapper">
        <Header>
          <SearchBar initialValue={searchTerm} onSearch={this.#handleSearch} />
        </Header>

        <main className="flex-1 w-full p-4 md:p-8">
          <ResultsContainer
            searchTerm={searchTerm}
            isLoading={isLoading}
            errorMessage={errorMessage}
            isEmpty={!arts || arts.length === 0}
          >
            {arts &&
              arts.map((art) => (
                <AICCard
                  key={art.id}
                  art={art}
                  getImageUrl={AICApiService.getImageUrl}
                />
              ))}
          </ResultsContainer>
        </main>
      </div>
    );
  }
}

export default App;
