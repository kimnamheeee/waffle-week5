import Button from './Button';
import '../styles/NavigationBar.css';

interface NavigationBarProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToSignup?: () => void;
}

const NavigationBar = ({
  isAuthenticated,
  userName,
  onLogout,
  onNavigateToLogin,
  onNavigateToSignup,
}: NavigationBarProps) => {
  return (
    <header className="nav-header">
      <h1 className="nav-logo">스누인턴</h1>

      <div>
        {isAuthenticated ? (
          <div className="nav-user-info">
            <span className="nav-user-name">{userName}님 안녕하세요!</span>
            <Button variant="danger" onClick={onLogout}>
              로그아웃
            </Button>
          </div>
        ) : (
          <div className="nav-buttons">
            <Button variant="primary" onClick={onNavigateToLogin}>
              로그인
            </Button>
            <Button variant="success" onClick={onNavigateToSignup}>
              회원가입
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
