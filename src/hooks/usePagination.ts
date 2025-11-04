import { useCallback, useState } from 'react';

interface UsePaginationParams {
  initialPage?: number;
  scrollToTop?: boolean;
}

interface UsePaginationReturn {
  currentPage: number;
  setPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

export const usePagination = ({
  initialPage = 0,
  scrollToTop = true,
}: UsePaginationParams = {}): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const setPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [scrollToTop]
  );

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollToTop]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollToTop]);

  return {
    currentPage,
    setPage,
    goToNextPage,
    goToPreviousPage,
  };
};
