import { useCallback, useEffect, useState } from 'react';
import { type Post, getPosts } from '../api/post/getPosts';
import { convertFiltersToApiParams } from '../utils/convertFiltersToApiParams';

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
  filters: {
    recruitmentStatus: string;
    industry: string[];
    sortOrder: string;
  };
}

export const usePosts = ({
  page,
  size = 10,
  filters,
}: UsePostsParams): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const apiParams = convertFiltersToApiParams(filters);

      const response = await getPosts({
        page,
        size,
        ...apiParams,
      });

      setPosts(response.posts || []);
      setTotalPages(response.paginator?.lastPage || 0);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError('공고를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [page, size, filters]);

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
