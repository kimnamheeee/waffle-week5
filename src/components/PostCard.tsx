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
        <span>
          마감:{' '}
          {(() => {
            try {
              const date = new Date(post.employmentEndDate as string);
              // If invalid date or epoch (time === 0) -> 상시채용
              if (Number.isNaN(date.getTime()) || date.getTime() === 0) {
                return '상시채용';
              }
              return date.toLocaleDateString('ko-KR');
            } catch {
              return '상시채용';
            }
          })()}
        </span>
      </div>

      <p className="post-description">{post.detailSummary}</p>
    </div>
  );
};

export default PostCard;
