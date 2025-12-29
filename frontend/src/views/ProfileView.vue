<template>
  <div class="profile-wrapper">
    <!-- Navbar -->
    <Navbar
      :user-name="user?.fullName || user?.username"
      :user-email="user?.email"
      @logout="handleLogout"
      @profile="handleProfile"
      @settings="handleSettings"
    />

    <!-- Profile Content -->
    <div class="profile-container">
      <div class="card">
        <div class="card__img">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%">
            <rect fill="#5B9BD5" width="540" height="450"></rect>
            <defs>
              <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
                <stop offset="0" stop-color="#5B9BD5"></stop>
                <stop offset="1" stop-color="#4A8BC2"></stop>
              </linearGradient>
              <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
                <g fill-opacity="0.3">
                  <polygon fill="#ffffff" points="90 150 0 300 180 300"></polygon>
                  <polygon points="90 150 180 0 0 0"></polygon>
                  <polygon fill="#ffffff" points="270 150 360 0 180 0"></polygon>
                  <polygon fill="#ffffff" points="450 150 360 300 540 300"></polygon>
                  <polygon fill="#ffffff" points="450 150 540 0 360 0"></polygon>
                  <polygon points="630 150 540 300 720 300"></polygon>
                  <polygon fill="#ffffff" points="630 150 720 0 540 0"></polygon>
                  <polygon fill="#ffffff" points="810 150 720 300 900 300"></polygon>
                  <polygon fill="#ffffff" points="810 150 900 0 720 0"></polygon>
                  <polygon fill="#ffffff" points="990 150 900 300 1080 300"></polygon>
                  <polygon fill="#ffffff" points="990 150 1080 0 900 0"></polygon>
                </g>
              </pattern>
            </defs>
            <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
            <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
          </svg>
        </div>
        <div class="card__avatar">
          <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <circle cx="64" cy="64" fill="#5B9BD5" r="60"></circle>
            <circle cx="64" cy="64" fill="#4A8BC2" opacity=".4" r="48"></circle>
            <path d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z" fill="#7f3838"></path>
            <path d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z" fill="#393c54" opacity=".4"></path>
            <circle cx="89" cy="65" fill="#fbc0aa" r="7"></circle>
            <path d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z" fill="#4bc190"></path>
            <path d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z" fill="#356cb6" opacity=".3"></path>
            <path d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z" fill="#356cb6" opacity=".3"></path>
            <path d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z" fill="#fff"></path>
            <path d="m64 88.75v9.75" fill="none" stroke="#fbc0aa" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"></path>
            <circle cx="39" cy="65" fill="#fbc0aa" r="7"></circle>
            <path d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z" fill="#ffd8c9"></path>
            <path d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z" fill="#bc5b57"></path>
            <circle cx="76" cy="62.28" fill="#515570" r="3"></circle>
            <circle cx="52" cy="62.28" fill="#515570" r="3"></circle>
            <ellipse cx="50.42" cy="69.67" fill="#f85565" opacity=".1" rx="4.58" ry="2.98"></ellipse>
            <ellipse cx="77.58" cy="69.67" fill="#f85565" opacity=".1" rx="4.58" ry="2.98"></ellipse>
            <g fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="m64 67v4" stroke="#fbc0aa" stroke-width="4"></path>
            </g>
            <path d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z" fill="#f85565" opacity=".4"></path>
            <path d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z" fill="#f85565"></path>
          </svg>
        </div>
        <div class="card__title">{{ user?.fullName || user?.username || 'User' }}</div>
        <div class="card__subtitle">{{ user?.email || 'user@example.com' }}</div>
        <div class="card__role">
          <span class="role-badge" :class="user?.role">{{ user?.role || 'user' }}</span>
        </div>
        <div class="card__wrapper">
          <button class="card__btn" @click="handleEditProfile">Edit Profile</button>
          <button class="card__btn card__btn-solid" @click="handleChangePassword">Change Password</button>
        </div>
      </div>
    </div>

    <!-- AI Chatbot -->
    <ChatBot />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import ChatBot from '../components/ChatBot.vue';

export default {
  name: 'ProfileView',
  components: {
    Navbar,
    ChatBot
  },
  setup() {
    const router = useRouter();
    const user = ref(null);

    onMounted(() => {
      // Load user from localStorage
      const userStr = localStorage.getItem('user');
      if (userStr) {
        user.value = JSON.parse(userStr);
      }
    });

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    };

    const handleProfile = () => {
      // Go back to upload page
      router.push('/');
    };

    const handleSettings = () => {
      console.log('Settings clicked');
      // TODO: Navigate to settings page
    };

    const handleEditProfile = () => {
      console.log('Edit profile clicked');
      // TODO: Implement edit profile functionality
    };

    const handleChangePassword = () => {
      console.log('Change password clicked');
      // TODO: Implement change password functionality
    };

    return {
      user,
      handleLogout,
      handleProfile,
      handleSettings,
      handleEditProfile,
      handleChangePassword
    };
  }
};
</script>

<style scoped>
.profile-wrapper {
  min-height: 100vh;
  background-image: url('@/assets/images/Dive_Bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
}

.card {
  --main-color: #5A5A5A;
  --submain-color: #78858F;
  --bg-color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position: relative;
  width: 340px;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: var(--bg-color);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card__img {
  height: 192px;
  width: 100%;
}

.card__img svg {
  height: 100%;
  width: 100%;
  border-radius: 20px 20px 0 0;
}

.card__avatar {
  position: absolute;
  width: 114px;
  height: 114px;
  background: var(--bg-color);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(50% - 164px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card__avatar svg {
  width: 100px;
  height: 100px;
}

.card__title {
  margin-top: 60px;
  font-weight: 600;
  font-size: 20px;
  color: var(--main-color);
}

.card__subtitle {
  margin-top: 8px;
  font-weight: 400;
  font-size: 14px;
  color: var(--submain-color);
}

.card__role {
  margin-top: 12px;
}

.role-badge {
  padding: 0.35rem 0.85rem;
  border-radius: 12px;
  font-size: 0.7rem;
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

.card__wrapper {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.card__btn {
  width: 140px;
  height: 40px;
  border: 2px solid var(--main-color);
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  color: var(--main-color);
  background: var(--bg-color);
  text-transform: none;
  transition: all 0.3s;
  cursor: pointer;
}

.card__btn-solid {
  background: linear-gradient(135deg, #5B9BD5 0%, #4A8BC2 100%);
  color: white;
  border-color: #5B9BD5;
}

.card__btn:hover {
  background: var(--main-color);
  color: var(--bg-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card__btn-solid:hover {
  background: linear-gradient(135deg, #4A8BC2 0%, #3A7BB2 100%);
  border-color: #4A8BC2;
  color: white;
}
</style>
