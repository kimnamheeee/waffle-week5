import { type Post } from '../api/post/getPosts';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  error: string;
}

const PostList = ({ posts, isLoading, error }: PostListProps) => {
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
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
