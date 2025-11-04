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
  const {
    filters,
    setRecruitmentStatus,
    setIndustry,
    setSortOrder,
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
          onReset={handleResetFilters}
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
