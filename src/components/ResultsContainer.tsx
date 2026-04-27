import React from 'react';

interface ResultsContainerProps {
  searchTerm: string;
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  children: React.ReactNode;
}
export class ResultsContainer extends React.Component<ResultsContainerProps> {
  render() {
    const { searchTerm, isLoading, errorMessage, isEmpty, children } =
      this.props;

    return (
      <section className="results-container">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {searchTerm ? `Results for "${searchTerm}"` : 'Art Collection'}
        </h2>

        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 border border-red-100">
            {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {!errorMessage && !isEmpty && (
              <div className="cards-grid">{children}</div>
            )}

            {!errorMessage && isEmpty && (
              <p className="text-gray-400 italic text-center py-10">
                No items found. Try another request!
              </p>
            )}
          </>
        )}
      </section>
    );
  }
}
