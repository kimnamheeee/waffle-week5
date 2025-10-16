import { type FormEvent, useState } from 'react';
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
  const { login } = useAuth();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    // Mock 로그인: 실제로는 API 호출
    // 여기서는 간단하게 이메일에서 이름을 추출
    const name = email.split('@')[0] || '사용자';

    login({
      name,
      email,
    });

    // 로그인 성공 후 홈 화면으로 이동
    onNavigateToHome();
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
            <div className="auth-form-group">
              <label className="auth-label">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@snu.ac.kr"
                className="auth-input"
                required
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
              />
            </div>

            <Button
              type="submit"
              disabled={!email || !password}
              variant="primary"
              fullWidth
            >
              로그인
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
