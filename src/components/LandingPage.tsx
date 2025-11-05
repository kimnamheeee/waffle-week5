import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookmark } from '../hooks/useBookmark';
import { usePagination } from '../hooks/usePagination';
import { usePostFilters } from '../hooks/usePostFilters';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../contexts/AuthContext';
import FilterSection from './FilterSection';
import LoginRequiredModal from './LoginRequiredModal';
import NavigationBar from './NavigationBar';
import Pagination from './Pagination';
import PostList from './PostList';
import '../styles/common.css';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { currentPage, setPage } = usePagination({ initialPage: 0 });
  const {
    filters,
    setRecruitmentStatus,
    setIndustry,
    setSortOrder,
    setPositions,
    resetFilters,
  } = usePostFilters();
  const { posts, isLoading, error, totalPages, refetch } = usePosts({
    page: currentPage,
    filters,
  });
  const { toggleBookmark, isLoading: isBookmarkLoading } = useBookmark();

  // 로그인 상태가 변경되면 posts를 다시 불러와서 북마크 상태 초기화
  useEffect(() => {
    refetch();
  }, [isAuthenticated, refetch]);

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

  const handleBookmarkClick = async (postId: string, isBookmarked: boolean) => {
    // 로그인하지 않은 경우 모달 표시
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    // 찜하기/해제 처리
    await toggleBookmark(postId, isBookmarked, () => {
      // 성공 시 목록 새로고침
      refetch();
    });
  };

  return (
    <div className="page-container">
      {/* 상단바 */}
      <NavigationBar isAuthenticated={isAuthenticated} onLogout={logout} />

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
          onBookmarkClick={handleBookmarkClick}
          isBookmarkLoading={isBookmarkLoading}
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
            onLogin={() => {
              setShowLoginModal(false);
              navigate('/login');
            }}
            onGoBack={() => setShowLoginModal(false)}
          />
        )}
      </main>
    </div>
  );
};

export default LandingPage;
