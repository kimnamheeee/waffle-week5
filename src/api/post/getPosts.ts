import axiosInstance from '../axiosInstance';

export interface Post {
	id: string;
	author: {
		id: string;
		name: string;
	};
	companyName: string;
	profileImageKey: string;
	positionTitle: string;
	positionType: string;
	domain: string;
	detailSummary: string;
	employmentEndDate: string;
	slogan: string;
	location: string;
	tags: Array<{ tag: string }>;
	isBookmarked: boolean;
	coffeeChatCount: number;
	headCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface GetPostsParams {
  page?: number;
  size?: number;
  sort?: string;
  jobCategory?: string;
}

export interface GetPostsResponse {
  posts: Post[];
  paginator: {
    lastPage: number;
  };
}

export const getPosts = async (
  params?: GetPostsParams
): Promise<GetPostsResponse> => {
  const response = await axiosInstance.get<GetPostsResponse>('/post', {
    params,
  });
  return response.data;
};
