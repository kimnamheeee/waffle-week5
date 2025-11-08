import { type Post } from '../api/post/getPosts';
import { mapApiDomainToKorean } from '../constants/domainMapping';
import Icon from '../icons/Icon';

interface PostCardProps {
  post: Post;
  onBookmarkClick?: () => void;
  isLoading?: boolean;
}

const PostCard = ({
  post,
  onBookmarkClick,
  isLoading = false,
}: PostCardProps) => {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    if (isLoading) return; // 로딩 중이면 무시
    onBookmarkClick?.();
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="company-logo">
          <Icon name="company-logo" size={48} />
        </div>
        <div className="company-name">{post.companyName}</div>
        <button
          className="bookmark-button"
          onClick={handleBookmarkClick}
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.5 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          <Icon
            name={post.isBookmarked ? 'bookmark-filled' : 'bookmark'}
            size={24}
          />
        </button>
      </div>

      <h3 className="post-title">{post.positionTitle}</h3>

      <div className="post-meta">
        <span className="post-category">
          {mapApiDomainToKorean(post.domain)}
        </span>
      </div>

      <div className="post-deadline">
        {(() => {
          try {
            const raw = post.employmentEndDate as string | null | undefined;
            const normalized = raw == null ? '' : String(raw).trim();

            // Treat empty, explicit '0', 'null', or the literal '상시채용' as no-deadline
            if (
              normalized === '' ||
              normalized === '0' ||
              normalized.toLowerCase() === 'null' ||
              normalized === '상시채용'
            ) {
              return <span>상시채용</span>;
            }

            const date = new Date(normalized);
            // If invalid date or epoch (time === 0) -> 상시채용
            if (Number.isNaN(date.getTime()) || date.getTime() === 0) {
              return <span>상시채용</span>;
            }

            return <span>마감: {date.toLocaleDateString('ko-KR')}</span>;
          } catch {
            return <span>상시채용</span>;
          }
        })()}
      </div>

      <p className="post-description">{post.detailSummary}</p>
    </div>
  );
};

export default PostCard;
