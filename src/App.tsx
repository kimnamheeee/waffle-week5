import { useState } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/common.css';

type Page = 'home' | 'login' | 'signup';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { loading } = useAuth();

  const navigateToHome = () => setCurrentPage('home');
  const navigateToLogin = () => setCurrentPage('login');
  const navigateToSignup = () => setCurrentPage('signup');

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '1.2rem',
          color: '#666',
        }}
      >
        로딩 중...
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onNavigateToSignup={navigateToSignup}
            onNavigateToHome={navigateToHome}
          />
        );
      case 'signup':
        return (
          <SignupPage
            onSignupComplete={navigateToHome}
            onNavigateToLogin={navigateToLogin}
          />
        );
      default:
        return (
          <HomePage
            onNavigateToLogin={navigateToLogin}
            onNavigateToSignup={navigateToSignup}
          />
        );
    }
  };

  return <div className="app-container">{renderCurrentPage()}</div>;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
