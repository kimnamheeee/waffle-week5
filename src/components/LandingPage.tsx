import { usePagination } from '../hooks/usePagination';
import { usePostFilters } from '../hooks/usePostFilters';
import { usePosts } from '../hooks/usePosts';
import FilterSection from './FilterSection';
import NavigationBar from './NavigationBar';
import Pagination from './Pagination';
import PostList from './PostList';
import '../styles/common.css';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const { currentPage, setPage } = usePagination({ initialPage: 0 });
  const { posts, isLoading, error, totalPages } = usePosts({
    page: currentPage,
  });
  const {
    filters,
    setRecruitmentStatus,
    setIndustry,
    setSortOrder,
    resetFilters,
  } = usePostFilters();

  const handlePageChange = (page: number) => {
    setPage(page);
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
          onRecruitmentStatusChange={setRecruitmentStatus}
          onIndustryChange={setIndustry}
          onSortOrderChange={setSortOrder}
          onReset={resetFilters}
        />

        <PostList posts={posts} isLoading={isLoading} error={error} />

        {!isLoading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default LandingPage;
