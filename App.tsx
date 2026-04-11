import React, { useState, useEffect } from 'react';
import RootLayout from './layout';
import Home from './page';
import LoginForm from './components/LoginForm';

const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('is_authenticated');
    const loginTime = sessionStorage.getItem('login_time');
    
    if (authStatus === 'true' && loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime);
      if (timeElapsed < SESSION_DURATION) {
        setIsAuthenticated(true);
        
        // Set remaining time for timeout
        const remainingTime = SESSION_DURATION - timeElapsed;
        const timer = setTimeout(() => {
          handleLogout();
        }, remainingTime);
        
        return () => clearTimeout(timer);
      } else {
        handleLogout();
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        handleLogout();
      }, SESSION_DURATION);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('is_authenticated', 'true');
    sessionStorage.setItem('login_time', Date.now().toString());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('is_authenticated');
    sessionStorage.removeItem('login_time');
  };

  return (
    <RootLayout>
      {!isAuthenticated ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Home />
      )}
    </RootLayout>
  );
};

export default App;