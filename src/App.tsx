import './App.css';
import React from 'react';

/*
 * <svg className="icon" role="presentation" aria-hidden="true">
 *    <use href="/icons.svg#documentation-icon"></use>
 * </svg>
 **/

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        {/* Header / Search Section */}
        <header className="header-wrapper">
          <div className="container mx-auto flex gap-4">
            <input
              type="text"
              placeholder="Search items..."
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
        </header>

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
