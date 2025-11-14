import axiosInstance from '../axiosInstance';
import type { Post } from './getPosts';

interface GetBookmarksParams {
  page?: number;
  size?: number;
}

interface GetBookmarksResponse {
  posts: Post[];
  paginator: {
    lastPage: number;
  };
}

export const getBookmarks = async (
  params?: GetBookmarksParams
): Promise<GetBookmarksResponse> => {
  const response = await axiosInstance.get<GetBookmarksResponse>(
    '/post/bookmarks',
    {
      params,
    }
  );
  return response.data;
};
