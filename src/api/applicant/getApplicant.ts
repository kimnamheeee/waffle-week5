import axiosInstance from '../../api/axiosInstance';

interface Applicant {
  id: string;
  name?: string;
  email?: string;
  enrollYear?: number; // e.g. 2019, 2021
  department?: string; // comma separated, primary first
  cvKey?: string;
}

export const getApplicant = async (): Promise<Applicant> => {
  const res = await axiosInstance.get<Applicant>('/applicant/me');
  return res.data;
};
