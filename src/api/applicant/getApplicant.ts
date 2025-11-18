import axiosInstance from '../../api/axiosInstance';

export interface Applicant {
  id: string;
  name?: string;
  email?: string;
  // 필요에 따라 다른 필드 추가
}

export const getApplicant = async (): Promise<Applicant> => {
  const res = await axiosInstance.get<Applicant>('/applicant/me');
  return res.data;
};
