import axiosInstance from '../axiosInstance';

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export const signUp = async ({ name, email, password }: SignUpRequest) => {
  try {
    const response = await axiosInstance.post('/auth/user', {
      authType: 'APPLICANT',
      info: {
        type: 'APPLICANT',
        successCode: 'successCode',
        name,
        email,
        password,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
