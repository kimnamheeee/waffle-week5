import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

const HomePage = ({ onNavigateToLogin, onNavigateToSignup }: HomePageProps) => {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* 상단바 */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          borderBottom: '1px solid #ddd',
          marginBottom: '2rem',
          backgroundColor: 'white',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>스누인턴</h1>

        <div>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 'bold' }}>
                {user?.name}님 안녕하세요!
              </span>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={onNavigateToLogin}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
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
                  cursor: 'pointer',
                }}
              >
                회원가입
              </button>
            </div>
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          {isAuthenticated && (
            <div
              style={{
                backgroundColor: '#f0f9ff',
                padding: '2rem',
                borderRadius: '8px',
                marginTop: '2rem',
              }}
            >
              <h3 style={{ color: '#0369a1', marginBottom: '1rem' }}>
                나의 실명 확인
              </h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                실명: {user?.name}
              </p>
              <p
                style={{ color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}
              >
                이메일: {user?.email}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
