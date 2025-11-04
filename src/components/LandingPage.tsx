import { useState } from 'react';
import { usePagination } from '../hooks/usePagination';
import { usePostFilters } from '../hooks/usePostFilters';
import { usePosts } from '../hooks/usePosts';
import FilterSection from './FilterSection';
import LoginRequiredModal from './LoginRequiredModal';
import NavigationBar from './NavigationBar';
import Pagination from './Pagination';
import PostList from './PostList';
import '../styles/common.css';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { currentPage, setPage } = usePagination({ initialPage: 0 });
  const {
    filters,
    setRecruitmentStatus,
    setIndustry,
    setSortOrder,
    setPositions,
    resetFilters,
  } = usePostFilters();
  const { posts, isLoading, error, totalPages } = usePosts({
    page: currentPage,
    filters,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRecruitmentStatusChange = (value: string) => {
    setRecruitmentStatus(value);
    setPage(0);
  };

  const handleIndustryChange = (values: string[]) => {
    setIndustry(values);
    setPage(0);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    setPage(0);
  };

  const handleResetFilters = () => {
    resetFilters();
    setPage(0);
  };

  return (
    <div className="page-container">
      {/* 상단바 */}
      <NavigationBar isAuthenticated={false} />

      {/* 메인 컨텐츠 */}
      <main className="landing-main">
        <FilterSection
          recruitmentStatus={filters.recruitmentStatus}
          industry={filters.industry}
          sortOrder={filters.sortOrder}
          onRecruitmentStatusChange={handleRecruitmentStatusChange}
          onIndustryChange={handleIndustryChange}
          onSortOrderChange={handleSortOrderChange}
          onPositionsChange={(codes) => {
            setPositions(codes);
            setPage(0);
          }}
          onReset={handleResetFilters}
        />

        <PostList
          posts={posts}
          isLoading={isLoading}
          error={error}
          onBookmarkClick={() => setShowLoginModal(true)}
        />

        {!isLoading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {showLoginModal && (
          <LoginRequiredModal
            onLogin={() => setShowLoginModal(false)}
            onGoBack={() => setShowLoginModal(false)}
          />
        )}
      </main>
    </div>
  );
};

export default LandingPage;
