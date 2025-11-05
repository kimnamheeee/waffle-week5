import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth/signUp';

interface UseSignupReturn {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string;
  isLoading: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  handleSignup: (e: React.FormEvent) => Promise<void>;
}

export const useSignup = (): UseSignupReturn => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);

    try {
      await signUp({ name, email, password });
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    error,
    isLoading,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSignup,
  };
};
