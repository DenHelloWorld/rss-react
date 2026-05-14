import React, { type JSX } from 'react';
import LoadingIndicator from './LoadIndicator.tsx';

interface ResultsContainerProps {
  searchTerm: string;
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  children: React.ReactNode;
}

export const ResultsContainer = ({
  searchTerm,
  isLoading,
  errorMessage,
  isEmpty,
  children,
}: ResultsContainerProps): JSX.Element => {
  return (
    <section className="shell relative">
      <h1 className="title top-bar">
        {searchTerm ? `Results for "${searchTerm}"` : 'Art Collection'}
      </h1>

      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 border border-red-100">
          {errorMessage}
        </div>
      )}

      {isLoading ? (
        <LoadingIndicator />
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
};
