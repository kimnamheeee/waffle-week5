import axiosInstance from '../axiosInstance';

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export const signUp = async ({ name, email, password }: SignUpRequest) => {
  try {
    const requestBody = {
      authType: 'APPLICANT',
      info: {
        type: 'APPLICANT', // info 안에도 type 필드 필요
        name,
        email,
        password,
      },
    };

    console.info('Attempting signup with:', {
      authType: 'APPLICANT',
      name,
      email,
    });

    const response = await axiosInstance.post('/auth/user', requestBody);
    return response.data;
  } catch (error: unknown) {
    console.error('SignUp API Error:', error);
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as {
        response?: { data?: unknown; status?: number };
      };
      console.error('Response data:', axiosError.response?.data);
      console.error('Response status:', axiosError.response?.status);
    }
    throw error;
  }
};
