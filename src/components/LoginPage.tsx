import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import Button from './Button';
import NavigationBar from './NavigationBar';
import '../styles/common.css';
import '../styles/auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    email,
    password,
    error,
    isLoading,
    setEmail,
    setPassword,
    handleLogin,
  } = useLogin();

  return (
    <div className="page-container">
      {/* 상단바 */}
      <NavigationBar isAuthenticated={false} />

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
            <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
              <Button variant="success" onClick={() => navigate('/signup')}>
                회원가입
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
