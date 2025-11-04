import { useEffect, useState } from 'react';
import { type Post, getPosts } from '../api/post/getPosts';
import FilterSection from './FilterSection';
import NavigationBar from './NavigationBar';
import Pagination from './Pagination';
import PostList from './PostList';
import '../styles/common.css';
import '../styles/LandingPage.css';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
  onNavigateToHome?: () => void;
}

const LandingPage = ({
  onNavigateToLogin,
  onNavigateToSignup,
  onNavigateToHome,
}: LandingPageProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [recruitmentStatus, setRecruitmentStatus] = useState('전체');
  const [industry, setIndustry] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState('최신순');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await getPosts({
          page: currentPage,
          size: 10,
          sort: 'createdAt,desc',
        });

        setPosts(response.posts || []);
        setTotalPages(response.paginator?.lastPage + 1 || 0);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('공고를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setRecruitmentStatus('전체');
    setIndustry([]);
    setSortOrder('최신순');
  };

  return (
    <div className="page-container">
      {/* 상단바 */}
      <NavigationBar
        isAuthenticated={false}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToSignup={onNavigateToSignup}
        onNavigateToHome={onNavigateToHome}
      />

      {/* 메인 컨텐츠 */}
      <main className="landing-main">
        <FilterSection
          recruitmentStatus={recruitmentStatus}
          industry={industry}
          sortOrder={sortOrder}
          onRecruitmentStatusChange={setRecruitmentStatus}
          onIndustryChange={setIndustry}
          onSortOrderChange={setSortOrder}
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
