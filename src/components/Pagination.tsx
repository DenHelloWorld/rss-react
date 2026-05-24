interface PaginationProps {
  total: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  total,
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
        disabled={currentPage <= 1}
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
        disabled={currentPage >= totalPages}
        onClick={handleNext}
      >
        <svg>
          <use href="/icons.svg#arrow-right" />
        </svg>
      </button>

      <span className="text-sm text-gray-500">Total: {total}</span>
    </div>
  );
};

export default Pagination;
