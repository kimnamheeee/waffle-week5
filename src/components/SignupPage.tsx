import { useSignup } from '../hooks/useSignup';
import Button from './Button';
import NavigationBar from './NavigationBar';
import '../styles/common.css';
import '../styles/auth.css';

const SignupPage = () => {
  const {
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
  } = useSignup();

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
