<template>
  <div class="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat register-wrapper">
    <div class="bg-white/90 backdrop-blur-lg rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-4 px-5 w-full max-w-[280px] text-center">
      <!-- Cloud Icon -->
      <div class="mb-3 flex justify-center">
        <svg width="30" height="22" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.4 18C37.92 11.88 32.88 7 26.64 7C23.04 7 19.92 8.76 17.76 11.4C16.56 10.92 15.24 10.68 13.92 10.68C8.88 10.68 4.8 14.76 4.8 19.8C2.04 20.52 0 23.04 0 26.04C0 29.64 2.88 32.52 6.48 32.52H37.68C41.88 32.52 45.36 29.04 45.36 24.84C45.36 20.88 42.36 17.64 38.4 18Z" fill="#5B9BD5"/>
        </svg>
      </div>

      <!-- Title -->
      <h1 class="text-sm font-semibold text-gray-600 mb-3 tracking-normal">Create UpDive Account</h1>

      <!-- Register Form -->
      <form class="flex flex-col gap-1.5 mb-1.5" @submit.prevent="handleRegister">
        <input
          class="w-full h-8 border border-gray-300 rounded-lg px-2.5 text-[11px] text-gray-800 bg-gray-50 transition-all duration-200 focus:outline-none focus:border-[#5B9BD5] focus:bg-white placeholder:text-gray-400"
          v-model="fullName"
          placeholder="Full Name"
          type="text"
          required
        >
        <input
          class="w-full h-8 border border-gray-300 rounded-lg px-2.5 text-[11px] text-gray-800 bg-gray-50 transition-all duration-200 focus:outline-none focus:border-[#5B9BD5] focus:bg-white placeholder:text-gray-400"
          v-model="username"
          placeholder="Username"
          type="text"
          required
        >
        <div class="relative">
          <input
            class="w-full h-8 border border-gray-300 rounded-lg px-2.5 pr-8 text-[11px] text-gray-800 bg-gray-50 transition-all duration-200 focus:outline-none focus:border-[#5B9BD5] focus:bg-white placeholder:text-gray-400"
            v-model="password"
            placeholder="Password"
            :type="showPassword ? 'text' : 'password'"
            required
          >
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg v-if="!showPassword" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="relative">
          <input
            class="w-full h-8 border border-gray-300 rounded-lg px-2.5 pr-8 text-[11px] text-gray-800 bg-gray-50 transition-all duration-200 focus:outline-none focus:border-[#5B9BD5] focus:bg-white placeholder:text-gray-400"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            :type="showConfirmPassword ? 'text' : 'password'"
            required
          >
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg v-if="!showConfirmPassword" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-[11px] font-medium py-1 px-2 bg-red-50 rounded-lg border border-red-500">
          {{ errorMessage }}
        </div>

        <div v-if="successMessage" class="text-green-600 text-[11px] font-medium py-1 px-2 bg-green-50 rounded-lg border border-green-500">
          {{ successMessage }}
        </div>

        <button
          class="w-full h-8 bg-gradient-to-br from-[#5B9BD5] to-[#4A8BC2] text-white border-0 rounded-lg text-[11px] font-semibold cursor-pointer transition-all duration-300 mt-0.5 hover:bg-gradient-to-br hover:from-[#4A8BC2] hover:to-[#3A7BB2] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(91,155,213,0.3)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <!-- Login Link -->
      <div class="mt-1.5 text-[11px] text-gray-500">
        Already have an account?
        <router-link to="/login" class="text-[#5B9BD5] text-[11px] font-medium hover:text-[#4A8BC2] hover:underline transition-all duration-200 ml-0.5">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

/**
 * RegisterView Component
 * Handles user registration and account creation
 */

// Constants
const ROUTES = {
  LOGIN: '/login'
};

const API_ENDPOINTS = {
  REGISTER: '/api/auth/register'
};

const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6
};

const ERROR_MESSAGES = {
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters',
  REGISTRATION_FAILED: 'Registration failed',
  CONNECTION_ERROR: 'Cannot connect to server'
};

const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Account created successfully! Redirecting to login...'
};

const REDIRECT_DELAY_MS = 2000; // 2 seconds

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter();
    
    // Reactive state
    const fullName = ref('');
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');
    const isLoading = ref(false);
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    /**
     * Validates password requirements
     * @param {string} password - Password to validate
     * @param {string} confirmPassword - Confirmation password
     * @returns {Object} Validation result with isValid flag and error message
     */
    const validatePassword = (password, confirmPassword) => {
      if (password !== confirmPassword) {
        return {
          isValid: false,
          error: ERROR_MESSAGES.PASSWORDS_NOT_MATCH
        };
      }
      
      if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
        return {
          isValid: false,
          error: ERROR_MESSAGES.PASSWORD_TOO_SHORT
        };
      }
      
      return { isValid: true, error: '' };
    };

    /**
     * Handles API error and returns user-friendly error message
     * @param {Error} error - The error object from axios
     * @returns {string} User-friendly error message
     */
    const handleApiError = (error) => {
      if (error.response) {
        return error.response.data.message || ERROR_MESSAGES.REGISTRATION_FAILED;
      }
      return ERROR_MESSAGES.CONNECTION_ERROR;
    };

    /**
     * Resets all form messages
     */
    const resetMessages = () => {
      errorMessage.value = '';
      successMessage.value = '';
    };

    /**
     * Handles registration form submission
     * Validates input, creates account, and redirects to login on success
     */
    const handleRegister = async () => {
      try {
        isLoading.value = true;
        resetMessages();

        // Validate password
        const validation = validatePassword(password.value, confirmPassword.value);
        if (!validation.isValid) {
          errorMessage.value = validation.error;
          isLoading.value = false;
          return;
        }

        const apiUrl = process.env.VUE_APP_API_URL + API_ENDPOINTS.REGISTER;
        const response = await axios.post(apiUrl, {
          fullName: fullName.value,
          username: username.value,
          password: password.value
        });

        if (response.data.success) {
          successMessage.value = SUCCESS_MESSAGES.ACCOUNT_CREATED;
          setTimeout(() => {
            router.push(ROUTES.LOGIN);
          }, REDIRECT_DELAY_MS);
        }
      } catch (error) {
        console.error('Registration error:', error);
        errorMessage.value = handleApiError(error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      fullName,
      username,
      password,
      confirmPassword,
      errorMessage,
      successMessage,
      isLoading,
      showPassword,
      showConfirmPassword,
      handleRegister
    };
  }
};
</script>

<style scoped>
.register-wrapper {
  background-image: url('@/assets/images/Dive_Bg.png');
}
</style>
