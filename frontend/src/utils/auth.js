import { useNavigate } from 'react-router-dom';

const API_BASE_URL = '/api';
const API_URL = `${API_BASE_URL}/auth`;

// Auth state management
export const auth = {
  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'Login failed: Server returned non-JSON response');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save token and user details to localStorage
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },

  // Register user
  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'Registration failed: Server returned non-JSON response');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Usually, you can automatically log them in or just return the data
    return data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
  }
};

// Auth hook for components
export const useAuth = () => {
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const user = await auth.login(email, password);
      // Let the component handle navigation if needed natively,
      // but if centralized here, just do:
      navigate('/dashboard');
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const user = await auth.register(name, email, password);
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    auth.logout();
    navigate('/');
  };

  return {
    user: auth.getCurrentUser(),
    isLoggedIn: auth.isLoggedIn(),
    login,
    register,
    logout
  };
};