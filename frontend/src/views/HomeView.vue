<template>
  <div class="home">
    <div class="nav-bar">
      <div class="user-info">
        <span class="welcome">Welcome, <strong>{{ user?.fullName || user?.username }}</strong></span>
        <span class="role-badge" :class="user?.role">{{ user?.role }}</span>
      </div>
      <button class="logout-btn" @click="handleLogout">Logout</button>
    </div>

    <div class="container">
      <h1>Welcome to UpDive System</h1>
      <p>Choose an action below</p>

      <div class="actions">
        <router-link to="/upload" class="action-card">
          <div class="card-icon">📤</div>
          <h3>Upload Files</h3>
          <p>Upload files to Google Drive</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

export default {
  name: 'HomeView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const user = computed(() => authStore.getUser);

    const handleLogout = () => {
      authStore.logout();
      router.push('/login');
    };

    return {
      user,
      handleLogout
    };
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.welcome {
  font-size: 1rem;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.role-badge.admin {
  background: #ff6b6b;
  color: white;
}

.role-badge.user {
  background: #4ecdc4;
  color: white;
}

.logout-btn {
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: white;
  color: #667eea;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

p {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.actions {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.action-card {
  background: white;
  color: #333;
  padding: 2rem;
  border-radius: 12px;
  width: 250px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.action-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #667eea;
}

.action-card p {
  font-size: 1rem;
  opacity: 0.7;
  margin-bottom: 0;
}
</style>
