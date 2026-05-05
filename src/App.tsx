import './App.css';
import React, { type JSX } from 'react';
import SearchBar from './components/SearchBar.tsx';
import Header from './components/Header.tsx';
import {
  localStorageService,
  STORAGE_KEYS,
} from './services/local-storage.service.ts';
import { AICApiService, type AICArtwork } from './services/AICApiService.ts';
import AICCard from './components/AICCard.tsx';
import { ResultsContainer } from './components/ResultsContainer.tsx';
import ErrorTrigger from './components/ErrorTrigger.tsx';

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
      localStorageService.getItem(STORAGE_KEYS.SEARCH_TERM) ?? '';

    this.state = {
      arts: null,
      searchTerm,
      isLoading: false,
      errorMessage: null,
    };
  }

  componentDidMount(): void {
    void this.#performSearch(this.state.searchTerm);
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
      this.setState({ searchTerm }, () => {
        void this.#performSearch(searchTerm);
      });
    }
  };

  render(): JSX.Element {
    const { arts, isLoading, errorMessage, searchTerm } = this.state;

    return (
      <div className="app-wrapper">
        <Header>
          <SearchBar initialValue={searchTerm} onSearch={this.#handleSearch} />
        </Header>

        <main className="main">
          <ErrorTrigger />

          <ResultsContainer
            searchTerm={searchTerm}
            isLoading={isLoading}
            errorMessage={errorMessage}
            isEmpty={!arts || arts.length === 0}
          >
            {arts?.map((art) => (
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
