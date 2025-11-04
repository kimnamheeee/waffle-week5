import { useCallback, useEffect, useState } from 'react';
import { type Post, getPosts } from '../api/post/getPosts';

interface UsePostsReturn {
  posts: Post[];
  isLoading: boolean;
  error: string;
  totalPages: number;
  refetch: () => Promise<void>;
}

interface UsePostsParams {
  page: number;
  size?: number;
  sort?: string;
}

export const usePosts = ({
  page,
  size = 10,
  sort = 'createdAt,desc',
}: UsePostsParams): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await getPosts({
        page,
        size,
        sort,
      });

      setPosts(response.posts || []);
      setTotalPages(response.paginator?.lastPage + 1 || 0);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError('공고를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [page, size, sort]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    isLoading,
    error,
    totalPages,
    refetch: fetchPosts,
  };
};
