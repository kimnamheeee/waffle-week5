interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages === 0) {
    return null;
  }

  const handlePreviousPage = () => {
    onPageChange(Math.max(0, currentPage - 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(totalPages - 1, currentPage + 1));
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
      >
        &lt;
      </button>

      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const page = i + Math.max(0, currentPage - 2);
        if (page >= totalPages) return null;
        return (
          <button
            key={page}
            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
            onClick={() => handlePageClick(page)}
          >
            {page + 1}
          </button>
        );
      })}

      <button
        className="pagination-button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
