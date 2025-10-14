import axiosInstance from '../axiosInstance';

interface SignInRequest {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInRequest) => {
  try {
    const response = await axiosInstance.post('/auth/user/session', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
