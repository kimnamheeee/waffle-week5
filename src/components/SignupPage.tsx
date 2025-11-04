import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth/signUp';
import Button from './Button';
import NavigationBar from './NavigationBar';
import '../styles/common.css';
import '../styles/auth.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: FormEvent) => {
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
    } catch (error) {
      console.error('Signup failed:', error);
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* 상단바 */}
      <NavigationBar isAuthenticated={false} />

      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">회원가입</h2>

          <form onSubmit={handleSignup}>
            {error && (
              <div
                style={{
                  color: '#e74c3c',
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#fadbd8',
                  borderRadius: '4px',
                }}
              >
                {error}
              </div>
            )}

            <div className="auth-form-group">
              <label className="auth-label">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                required
                disabled={isLoading}
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@snu.ac.kr"
                className="auth-input"
                required
                disabled={isLoading}
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
                disabled={isLoading}
              />
            </div>

            <div className="auth-form-group last">
              <label className="auth-label">비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={
                !name || !email || !password || !confirmPassword || isLoading
              }
              variant="success"
              fullWidth
            >
              {isLoading ? '회원가입 중...' : '회원가입'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
