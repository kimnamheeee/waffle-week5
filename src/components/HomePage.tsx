import { useAuth } from '../contexts/AuthContext';
import NavigationBar from './NavigationBar';
import '../styles/common.css';
import '../styles/HomePage.css';

const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="page-container">
      {/* 상단바 */}
      <NavigationBar isAuthenticated={isAuthenticated} onLogout={logout} />

      {/* 메인 컨텐츠 */}
      <main className="home-main">
        <div className="home-content">
          {isAuthenticated && (
            <div className="home-user-card">
              <h3 className="home-user-card-title">나의 실명 확인</h3>
              <p className="home-user-name">실명: {user?.name}</p>
              <p className="home-user-email">이메일: {user?.email}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
