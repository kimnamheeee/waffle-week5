import { useState } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { AuthProvider } from './contexts/AuthContext';
import './styles/common.css';

type Page = 'home' | 'login' | 'signup';

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateToHome = () => setCurrentPage('home');
  const navigateToLogin = () => setCurrentPage('login');
  const navigateToSignup = () => setCurrentPage('signup');

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

  return (
    <AuthProvider>
      <div className="app-container">{renderCurrentPage()}</div>
    </AuthProvider>
  );
};

export default App;
