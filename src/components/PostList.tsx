import { type Post } from '../api/post/getPosts';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  error: string;
  onBookmarkClick?: (postId: string, isBookmarked: boolean) => void;
  isBookmarkLoading?: (postId: string) => boolean;
}

const PostList = ({
  posts,
  isLoading,
  error,
  onBookmarkClick,
  isBookmarkLoading,
}: PostListProps) => {
  if (isLoading) {
    return <div className="loading-state">로딩 중...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="empty-state">등록된 공고가 없습니다.</div>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onBookmarkClick={
            onBookmarkClick
              ? () => onBookmarkClick(post.id, post.isBookmarked)
              : undefined
          }
          isLoading={isBookmarkLoading?.(post.id) ?? false}
        />
      ))}
    </div>
  );
};

export default PostList;
