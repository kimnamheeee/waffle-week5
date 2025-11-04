import { type Post } from '../api/post/getPosts';
import { mapApiDomainToKorean } from '../constants/domainMapping';
import Icon from '../icons/Icon';

interface PostCardProps {
  post: Post;
  onBookmarkClick?: () => void;
}

const PostCard = ({ post, onBookmarkClick }: PostCardProps) => {
  const handleBookmarkClick = () => {
    onBookmarkClick?.();
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="company-logo">
          <Icon name="company-logo" size={48} />
        </div>
        <div className="company-name">{post.companyName}</div>
        <button className="bookmark-button" onClick={handleBookmarkClick}>
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
          마감: {new Date(post.employmentEndDate).toLocaleDateString('ko-KR')}
        </span>
      </div>

      <p className="post-description">{post.detailSummary}</p>
    </div>
  );
};

export default PostCard;
