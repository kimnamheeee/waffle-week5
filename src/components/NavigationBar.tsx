import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import '../styles/NavigationBar.css';

interface NavigationBarProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout?: () => void;
}

const NavigationBar = ({
  isAuthenticated,
  userName,
  onLogout,
}: NavigationBarProps) => {
  const navigate = useNavigate();

  return (
    <header className="nav-header">
      <h1 className="nav-logo">
        <Link to="/">스누인턴</Link>
      </h1>

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
            <Button variant="primary" onClick={() => navigate('/login')}>
              로그인
            </Button>
            <Button variant="success" onClick={() => navigate('/signup')}>
              회원가입
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationBar;
