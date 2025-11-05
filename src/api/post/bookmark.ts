import axiosInstance from '../axiosInstance';

// 찜하기 추가
export const addBookmark = async (postId: string): Promise<void> => {
  await axiosInstance.post(`/post/${postId}/bookmark`);
};

// 찜하기 해제
export const deleteBookmark = async (postId: string): Promise<void> => {
  await axiosInstance.delete(`/post/${postId}/bookmark`);
};
