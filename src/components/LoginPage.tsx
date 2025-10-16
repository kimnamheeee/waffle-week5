import { type FormEvent, useState } from 'react';
import { signIn } from '../api/auth/signIn';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import NavigationBar from './NavigationBar';
import '../styles/common.css';
import '../styles/auth.css';

interface LoginPageProps {
  onNavigateToSignup: () => void;
  onNavigateToHome: () => void;
}

const LoginPage = ({
  onNavigateToSignup,
  onNavigateToHome,
}: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await signIn({ email, password });

      await login(response.token);

      onNavigateToHome();
    } catch (error) {
      console.error('Login failed:', error);
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* 상단바 */}
      <NavigationBar
        isAuthenticated={false}
        onNavigateToLogin={onNavigateToHome}
        onNavigateToSignup={onNavigateToSignup}
      />

      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">로그인</h2>

          <form onSubmit={handleLogin}>
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

            <div className="auth-form-group last">
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

            <Button
              type="submit"
              disabled={!email || !password || isLoading}
              variant="primary"
              fullWidth
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
