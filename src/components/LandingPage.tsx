import { useEffect, useState } from 'react';
import { type Post, getPosts } from '../api/post/getPosts';
import NavigationBar from './NavigationBar';
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
        {/* 직군 필터 */}
        <div className="filter-section">
          <button className="filter-dropdown">
            <span>직군 필터</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="filter-options">
            <div className="filter-row">
              <label className="filter-label">모집상태</label>
              <button className="filter-button">
                <span>전체</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="filter-row">
              <label className="filter-label">업종</label>
              <button className="filter-button">
                <span>전체</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="filter-row">
              <label className="filter-label">최신순</label>
              <button className="refresh-button">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84821 2 11.5153 2.84285 12.6 4.2M12.6 4.2V2M12.6 4.2H10.4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>초기화</span>
              </button>
            </div>
          </div>
        </div>

        {/* 공고 리스트 */}
        {isLoading ? (
          <div className="loading-state">로딩 중...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : !posts || posts.length === 0 ? (
          <div className="empty-state">등록된 공고가 없습니다.</div>
        ) : (
          <div className="posts-container">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="company-logo">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="48" height="48" rx="8" fill="#E5E7EB" />
                      <path
                        d="M24 16L28 20L24 24L20 20L24 16Z"
                        fill="#9CA3AF"
                      />
                      <path
                        d="M24 24L28 28L24 32L20 28L24 24Z"
                        fill="#9CA3AF"
                      />
                    </svg>
                  </div>
                  <div className="company-name">{post.companyName}</div>
                  <button className="bookmark-button">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={post.isBookmarked ? 'currentColor' : 'none'}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <h3 className="post-title">{post.positionTitle}</h3>

                <div className="post-meta">
                  <span className="post-category">{post.domain}</span>
                </div>

                <div className="post-deadline">
                  <span>
                    마감:{' '}
                    {new Date(post.employmentEndDate).toLocaleDateString(
                      'ko-KR'
                    )}
                  </span>
                </div>

                <p className="post-description">{post.detailSummary}</p>
              </div>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        {!isLoading && !error && totalPages > 0 && (
          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
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
                  onClick={() => handlePageChange(page)}
                >
                  {page + 1}
                </button>
              );
            })}

            <button
              className="pagination-button"
              onClick={() =>
                handlePageChange(Math.min(totalPages - 1, currentPage + 1))
              }
              disabled={currentPage === totalPages - 1}
            >
              &gt;
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
