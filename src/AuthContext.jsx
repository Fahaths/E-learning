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

// Create Auth Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        try {
          const response = await api.post('/jwt-auth/v1/token/validate');
          if (response.ok) {
            setUser(jwtDecode(token));
          } else {
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
      const response = await api.post('/jwt-auth/v1/token', {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('jwt_token', response.data.token);
        setUser(jwtDecode(response.data.token));
        return { success: true };
      }
      return { success: false, message: 'Authentication failed' };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (username, email, password) => {
    try {
const response = await fetch(`${API_URL}/wp/v2/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin-user:admin-password') // For initial setup
      },
      body: JSON.stringify({ username, email, password })





      });


      return { success: true, data: response.data };
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
