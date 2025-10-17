import axiosInstance from '../axiosInstance';

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
