import { type FormEvent, useState } from 'react';
import Button from './Button';
import NavigationBar from './NavigationBar';
import '../styles/common.css';
import '../styles/auth.css';

interface SignupPageProps {
  onSignupComplete: () => void;
  onNavigateToLogin: () => void;
}

const SignupPage = ({
  onSignupComplete,
  onNavigateToLogin,
}: SignupPageProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();

    // Mock 회원가입 로직 (실제로는 API 호출)
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 완료 후 홈 화면으로 이동
    alert('회원가입이 완료되었습니다!');
    onSignupComplete();
  };

  return (
    <div className="page-container">
      {/* 상단바 */}
      <NavigationBar
        isAuthenticated={false}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToSignup={onSignupComplete}
      />

      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">회원가입</h2>

          <form onSubmit={handleSignup}>
            <div className="auth-form-group">
              <label className="auth-label">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
                required
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
              />
            </div>

            <Button
              type="submit"
              disabled={!name || !email || !password || !confirmPassword}
              variant="success"
              fullWidth
            >
              회원가입
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
