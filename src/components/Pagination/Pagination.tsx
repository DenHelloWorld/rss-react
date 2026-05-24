interface PaginationProps {
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  total,
  isFetching,
}: PaginationProps) => {
  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        className="button button--icon"
        disabled={currentPage <= 1 || isFetching}
        onClick={handlePrev}
      >
        <svg>
          <use href="/icons.svg#arrow-left" />
        </svg>
      </button>

      <span>
        <span>{currentPage}</span> / <span>{totalPages}</span>
      </span>

      <button
        className="button button--icon"
        disabled={currentPage >= totalPages || isFetching}
        onClick={handleNext}
      >
        <svg>
          <use href="/icons.svg#arrow-right" />
        </svg>
      </button>

      <span className="text-xs text-gray-500">Total: {total}</span>
    </div>
  );
};

export default Pagination;
