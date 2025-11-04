import { useState } from 'react';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/common.css';

type Page = 'home' | 'login' | 'signup' | 'landing';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const { loading } = useAuth();

  const navigateToHome = () => setCurrentPage('home');
  const navigateToLanding = () => setCurrentPage('landing');
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
      case 'landing':
        return (
          <LandingPage
            onNavigateToLogin={navigateToLogin}
            onNavigateToSignup={navigateToSignup}
            onNavigateToHome={navigateToLanding}
          />
        );
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
      case 'home':
        return (
          <HomePage
            onNavigateToLogin={navigateToLogin}
            onNavigateToSignup={navigateToSignup}
            onNavigateToLanding={navigateToLanding}
          />
        );
      default:
        return (
          <LandingPage
            onNavigateToLogin={navigateToLogin}
            onNavigateToSignup={navigateToSignup}
            onNavigateToHome={navigateToLanding}
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
