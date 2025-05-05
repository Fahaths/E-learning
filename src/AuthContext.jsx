import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Update import to match the new export structure


const API_URL = 'https://testlms.measiit.edu.in/wp-json';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enable detailed network logging
api.interceptors.request.use(config => {
  console.groupCollapsed(`%cRequest: ${config.method?.toUpperCase()} ${config.url}`, 'color: #1c64f2');
  console.log('Request Config:', config);
  console.groupEnd();
  return config;
});

api.interceptors.response.use(response => {
  console.groupCollapsed(`%cResponse: ${response.status} ${response.config.url}`, 'color: #0e9f6e');
  console.log('Response Data:', response.data);
  console.log('Full Response:', response);
  console.groupEnd();
  return response;
}, error => {
  console.groupCollapsed(`%cError: ${error.response?.status || 'No Status'} ${error.config?.url}`, 'color: #f05252');
  console.log('Error Details:', error);
  console.log('Request Config:', error.config);
  console.log('Response:', error.response);
  console.groupEnd();
  return Promise.reject(error);
});

// Create Auth Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSessionId, setActiveSessionId] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          const response = await api.post('/jwt-auth/v1/token/validate', {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.status === 200) {
            setUser(jwtDecode(token));
          } else {
            console.error('Token validation failed:', response.data);
            localStorage.removeItem('jwt_token');
          }
        } catch (error) {
          localStorage.removeItem('jwt_token');
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      // First validate inputs
      if (!username || !password) {
        return { success: false, message: 'Username and password are required' };
      }

      // Check for existing valid session
      const existingToken = localStorage.getItem('jwt_token');
      if (existingToken) {
        try {
          const validation = await api.post('/jwt-auth/v1/token/validate', {}, {
            headers: { 'Authorization': `Bearer ${existingToken}` }
          });
          if (validation.status === 200) {
            const decodedToken = jwtDecode(existingToken);
            const hasUserInfo = decodedToken.username || decodedToken.email || decodedToken.sub;
            
            console.group('Active Session Details');
            console.log('Valid existing token found');
            if (hasUserInfo) {
              console.log('User ID:', decodedToken.sub || 'N/A');
              console.log('Username:', decodedToken.username || 'N/A');
              console.log('Email:', decodedToken.email || 'N/A');
            }
            console.log('Token Type:', hasUserInfo ? 'User Token' : 'Service Token');
            console.log('Issued at:', new Date(decodedToken.iat * 1000));
            console.log('Expires at:', new Date(decodedToken.exp * 1000));
            console.log('Time Remaining:', 
              Math.round((decodedToken.exp * 1000 - Date.now())/60000) + ' minutes');
            console.groupEnd();
            
            return {
              success: false,
              message: 'Active Session Found',
              details: hasUserInfo 
                ? `An active session exists for ${decodedToken.username || decodedToken.email || decodedToken.sub}`
                : 'An active service session exists',
              sessionInfo: {
                issuedAt: new Date(decodedToken.iat * 1000).toLocaleString(),
                expiresAt: new Date(decodedToken.exp * 1000).toLocaleString(),
                timeRemaining: Math.round((decodedToken.exp * 1000 - Date.now())/60000) + ' minutes'
              },
              resolutionOptions: {
                primary: 'Logout from current session',
                secondary: ['Close all browser tabs', 'Wait for session to expire']
              },
              isActiveSessionError: true,
              statusCode: 409
            };
          }
        } catch (e) {
          // Existing token is invalid, proceed with login
          localStorage.removeItem('jwt_token');
        }
      }

      // Make API request with timeout
      const response = await Promise.race([
        api.post('/jwt-auth/v1/token', { username, password }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )
      ]);

      if (response.data?.token) {
        localStorage.setItem('jwt_token', response.data.token);
        setUser(jwtDecode(response.data.token));
        return { success: true };
      }

      console.error('Login failed - Response:', response);
      return { 
        success: false, 
        message: response.data?.message || 'Authentication failed' 
      };
      } catch (error) {
      console.group('Login Error Details');
      console.error('Error Message:', error.message);
      console.error('HTTP Status:', error.response?.status);
      console.error('Response Data:', error.response?.data);
      console.error('Request Config:', {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      });
      console.error('Stack Trace:', error.stack);
      console.groupEnd();
      
      let errorMessage = 'Login failed. Please try again.';
      if (error.response?.status === 403) {
        if (error.response?.data?.code === '[jwt_auth] ip_blocked') {
          errorMessage = 'Too many login attempts. Please try again later.';
        } else {
          errorMessage = 'Invalid credentials or account not found';
        }
      } else if (error.message === 'Request timeout') {
        errorMessage = 'Server is not responding. Please try again later.';
      }

      return { success: false, message: errorMessage };
    }
  };

  const register = async (username, email, password) => {
    try {
      // Directly create new user without admin authentication
      const response = await api.post('/custom/v1/register', {
        username,
        email,
        password,
      });

      if (response.data.success) {
        return { 
          success: true,
          message: 'Registration successful. Please login.'
        };
      }
      return { 
        success: false, 
        message: response.data?.message || 'Registration failed' 
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
