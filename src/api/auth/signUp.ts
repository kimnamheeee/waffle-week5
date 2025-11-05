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
    
    console.info('Attempting signup with:', { authType: 'APPLICANT', name, email });
    
    const response = await axiosInstance.post('/auth/user', requestBody);
    return response.data;
  } catch (error: any) {
    console.error('SignUp API Error:', error);
    console.error('Response data:', error.response?.data);
    console.error('Response status:', error.response?.status);
    throw error;
  }
};
