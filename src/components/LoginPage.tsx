import { useState, type FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigateToSignup: () => void;
  onNavigateToHome: () => void;
}

const LoginPage = ({ onNavigateToSignup, onNavigateToHome }: LoginPageProps) => {
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
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* 상단바 */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid #ddd',
        marginBottom: '2rem',
        backgroundColor: 'white'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>스누인턴</h1>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            로그인
          </button>
          <button
            onClick={onNavigateToSignup}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            회원가입
          </button>
        </div>
      </header>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 120px)', 
        padding: '0 2rem 2rem 2rem'
      }}>
        <div style={{ 
          maxWidth: '400px',
          width: '100%',
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '2rem',
          backgroundColor: '#f9f9f9'
        }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>로그인</h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left' }}>
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="@snu.ac.kr"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left' }}>
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563eb';
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: (!email || !password) ? '#d1d5db' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: (!email || !password) ? 'not-allowed' : 'pointer',
              opacity: (!email || !password) ? 0.6 : 1
            }}
          >
            로그인
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;