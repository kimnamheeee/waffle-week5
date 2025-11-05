import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './styles/common.css';

const LoadingScreen = () => (
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

const AppRoutes = () => {
  const { loading } = useAuth();
  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="app-container">
        <AppRoutes />
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
