import { useEffect, useState } from 'react';
import { type Post, getPosts } from '../api/post/getPosts';
import { useDropdown } from '../hooks/useDropdown';
import Icon from '../icons/Icon';
import DropdownFilter from './DropdownFilter';
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
  const [recruitmentStatus, setRecruitmentStatus] = useState('전체');
  const [industry, setIndustry] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState('최신순');
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();

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
            <Icon name="chevron-down-large" size={20} />
          </button>

          <div className="filter-options">
            <DropdownFilter
              buttonLabel="모집상태"
              options={['전체', '모집중']}
              selectedValue={recruitmentStatus}
              onValueChange={setRecruitmentStatus}
              onApply={(value) => {
                if (typeof value === 'string') {
                  setRecruitmentStatus(value);
                }
              }}
              isOpen={isOpen('recruitment-status')}
              onToggle={() => toggleDropdown('recruitment-status')}
              onClose={closeDropdown}
            />
            <DropdownFilter
              buttonLabel="업종"
              multiSelect
              options={[
                '전체',
                '핀테크',
                '헬스테크',
                '교육',
                '이커머스',
                '푸드테크',
                '모빌리티',
                '컨텐츠',
                'B2B',
                '기타',
              ]}
              selectedValues={industry}
              onValuesChange={setIndustry}
              onApply={(values) => {
                setIndustry(values as string[]);
              }}
              isOpen={isOpen('industry')}
              onToggle={() => toggleDropdown('industry')}
              onClose={closeDropdown}
            />
            <DropdownFilter
              buttonLabel="최신순"
              options={['공고등록순', '마감임박순']}
              selectedValue={sortOrder}
              onValueChange={setSortOrder}
              onApply={(value) => {
                if (typeof value === 'string') {
                  setSortOrder(value);
                }
              }}
              isOpen={isOpen('sort-order')}
              onToggle={() => toggleDropdown('sort-order')}
              onClose={closeDropdown}
            />
            <button
              className="reset-button"
              onClick={() => {
                setRecruitmentStatus('전체');
                setIndustry([]);
                setSortOrder('최신순');
              }}
            >
              <Icon name="refresh" size={16} />
              <span>초기화</span>
            </button>
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
                    <Icon name="company-logo" size={48} />
                  </div>
                  <div className="company-name">{post.companyName}</div>
                  <button className="bookmark-button">
                    <Icon
                      name={post.isBookmarked ? 'bookmark-filled' : 'bookmark'}
                      size={24}
                    />
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
