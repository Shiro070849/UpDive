<template>
  <div class="login-wrapper">
    <div class="login-card">
      <!-- Cloud Icon -->
      <div class="cloud-icon">
        <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38.4 18C37.92 11.88 32.88 7 26.64 7C23.04 7 19.92 8.76 17.76 11.4C16.56 10.92 15.24 10.68 13.92 10.68C8.88 10.68 4.8 14.76 4.8 19.8C2.04 20.52 0 23.04 0 26.04C0 29.64 2.88 32.52 6.48 32.52H37.68C41.88 32.52 45.36 29.04 45.36 24.84C45.36 20.88 42.36 17.64 38.4 18Z" fill="#5B9BD5"/>
        </svg>
      </div>

      <!-- Title -->
      <h1 class="login-title">SYSTEM LOGIN</h1>

      <!-- Login Form -->
      <form class="login-form" @submit.prevent="handleLogin">
        <input
          class="login-input"
          v-model="username"
          placeholder="Username"
          type="text"
          required
        >
        <input
          class="login-input"
          v-model="password"
          placeholder="Password"
          type="password"
          required
        >

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button
          class="login-button"
          type="submit"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Loading...' : 'Log In' }}
        </button>
      </form>

      <!-- Forgot Password Link -->
      <a href="#" class="forgot-link">Forgot Password?</a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const isLoading = ref(false);

    const handleLogin = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';

        const response = await axios.post('http://localhost:8088/api/auth/login', {
          username: username.value,
          password: password.value
        });

        if (response.data.success) {
          // Save token and user info to localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));

          // Redirect to upload page
          router.push('/');
        }
      } catch (error) {
        console.error('Login error:', error);
        if (error.response) {
          errorMessage.value = error.response.data.message || 'Login failed';
        } else {
          errorMessage.value = 'Cannot connect to server';
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      username,
      password,
      errorMessage,
      isLoading,
      handleLogin
    };
  }
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/images/Dive_Bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  padding: 56px 48px;
  width: 100%;
  max-width: 420px;
  text-align: center;
}

.cloud-icon {
  margin-bottom: 28px;
  display: flex;
  justify-content: center;
}

.login-title {
  font-size: 26px;
  font-weight: 600;
  color: #5A5A5A;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.login-input {
  width: 100%;
  height: 52px;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 0 18px;
  font-size: 15px;
  color: #333;
  background: #FAFAFA;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.login-input::placeholder {
  color: #999;
}

.login-input:focus {
  outline: none;
  border-color: #5B9BD5;
  background: white;
}

.login-button {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, #5B9BD5 0%, #4A8BC2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
}

.login-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #4A8BC2 0%, #3A7BB2 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(91, 155, 213, 0.3);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.forgot-link {
  display: inline-block;
  margin-top: 20px;
  color: #5B9BD5;
  font-size: 15px;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #4A8BC2;
  text-decoration: underline;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  background-color: #ffeeee;
  border-radius: 8px;
  border: 1px solid #ff4444;
}
</style>
