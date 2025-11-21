import axiosInstance from '../../api/axiosInstance';

interface PutApplicantPayload {
  enrollYear: number;
  department: string; // comma separated, primary first
  cvKey?: string;
}

export const putApplicant = async (payload: PutApplicantPayload) => {
  const res = await axiosInstance.put('/applicant/me', payload);
  return res.data;
};
