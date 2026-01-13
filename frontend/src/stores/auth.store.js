import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL + '/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false
  }),

  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
    getUserRole: (state) => state.user?.role || null
  },

  actions: {
    /**
     * Initialize auth state from localStorage
     */
    initAuth() {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        this.token = token;
        this.user = JSON.parse(userStr);
        this.isAuthenticated = true;

        // Set default axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    },

    /**
     * Login action
     * Auth Contract: Must return { success, token, user, role }
     */
    async login(username, password) {
      try {
        this.isLoading = true;

        const response = await axios.post(`${API_URL}/auth/login`, {
          username,
          password
        });

        if (response.data.success) {
          // Save to state
          this.token = response.data.token;
          this.user = response.data.user;
          this.isAuthenticated = true;

          // Save to localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));

          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

          return {
            success: true,
            token: response.data.token,
            user: response.data.user,
            role: response.data.user.role
          };
        }

        return { success: false, message: 'Login failed' };
      } catch (error) {
        console.error('Login error:', error);
        return {
          success: false,
          message: error.response?.data?.message || 'Login failed'
        };
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Verify token validity
     * Returns AUTH_EXPIRED if token is invalid
     */
    async verifyToken() {
      if (!this.token) {
        return { success: false, code: 'AUTH_EXPIRED' };
      }

      try {
        const response = await axios.get(`${API_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });

        if (response.data.success) {
          return { success: true, user: response.data.user };
        }

        // Token invalid
        this.logout();
        return { success: false, code: 'AUTH_EXPIRED' };
      } catch (error) {
        // Token expired or invalid
        this.logout();
        return { success: false, code: 'AUTH_EXPIRED' };
      }
    },

    /**
     * Logout action
     */
    logout() {
      // Clear state
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Clear axios header
      delete axios.defaults.headers.common['Authorization'];
    },

    /**
     * Check if user has required role
     */
    hasRole(role) {
      return this.user?.role === role;
    },

    /**
     * Get current state for decision making
     * Never guess - always return current state
     */
    getCurrentState() {
      return {
        isAuthenticated: this.isAuthenticated,
        user: this.user,
        token: this.token,
        role: this.user?.role || null
      };
    }
  }
});
