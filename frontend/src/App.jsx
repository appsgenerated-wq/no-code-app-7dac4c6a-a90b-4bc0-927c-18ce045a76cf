import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants';
import './index.css';
import { testBackendConnection } from './services/apiService.js';

function App() {
  const [user, setUser] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [potatoes, setPotatoes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const manifest = new Manifest(config.APP_ID);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await manifest.from('users').me();
        if (currentUser) {
          setUser(currentUser);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
    loadAllPotatoes();
  }, [])

  useEffect(() => {
    // Test backend connection on app start
    const testConnection = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful - proceeding with app initialization');
      } else {
        console.error('❌ [APP] Backend connection failed - app may not work properly');
        console.error('❌ [APP] Connection error:', result.error);
      }
    };
    
    testConnection();
  }, []);;

  const login = async (email, password) => {
    try {
      await manifest.login('users', email, password);
      const loggedInUser = await manifest.from('users').me();
      setUser(loggedInUser);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setIsLoggedIn(false);
  };

  const loadAllPotatoes = async () => {
    try {
      const response = await manifest.from('potatoes').find({ 
        include: ['contributor'],
        sort: { createdAt: 'desc' }
      });
      setPotatoes(response.data);
    } catch (error) {
      console.error('Failed to load potatoes:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading PotatoPedia...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {isLoggedIn && user ? (
        <DashboardPage 
          user={user} 
          onLogout={logout}
        />
      ) : (
        <LandingPage 
          onLogin={() => login('contributor@manifest.build', 'password')} 
          potatoes={potatoes}
        />
      )}
    </div>
  );
}

export default App;