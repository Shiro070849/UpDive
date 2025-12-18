<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <div class="logo-icon">
          <!-- Cloud with checkmark icon -->
          <svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.5 12C31.4 6.8 26.8 3 21.3 3C16.8 3 12.9 5.5 11 9.2C6.3 9.7 2.5 13.7 2.5 18.5C2.5 23.7 6.8 28 12 28H31C35 28 38.5 24.5 38.5 20.5C38.5 16.7 35.4 13.5 31.5 12.5" fill="url(#cloud-grad)"/>
            <path d="M14 17L18 21L27 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="cloud-grad" x1="2.5" y1="3" x2="38.5" y2="28" gradientUnits="userSpaceOnUse">
                <stop stop-color="#60A5FA"/>
                <stop offset="0.5" stop-color="#38BDF8"/>
                <stop offset="1" stop-color="#34D399"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="logo-text">UpDive</span>
      </div>

      <!-- User Section -->
      <div class="navbar-user">
        <!-- User Profile -->
        <div class="user-profile" @click="toggleDropdown">
          <div class="user-avatar">
            <img v-if="userAvatar" :src="userAvatar" :alt="userName" />
            <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
              <path d="M4 20C4 17 7.58 14.5 12 14.5C16.42 14.5 20 17 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="user-name">{{ userName }}</span>
          <svg class="dropdown-arrow" :class="{ 'rotate': isDropdownOpen }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Settings Button -->
        <button class="settings-btn" @click="openSettings" title="Settings">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <transition name="dropdown">
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <div class="dropdown-header">
              <div class="dropdown-avatar">
                <img v-if="userAvatar" :src="userAvatar" :alt="userName" />
                <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                  <path d="M4 20C4 17 7.58 14.5 12 14.5C16.42 14.5 20 17 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="dropdown-user-info">
                <span class="dropdown-user-name">{{ userName }}</span>
                <span class="dropdown-user-email">{{ userEmail }}</span>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" @click="goToProfile">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M4 20C4 17 7.58 14.5 12 14.5C16.42 14.5 20 17 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Profile</span>
            </button>
            <button class="dropdown-item" @click="goToSettings">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>Settings</span>
            </button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item logout" @click="logout">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </transition>
      </div>
    </div>

    <!-- Overlay for closing dropdown -->
    <div v-if="isDropdownOpen" class="dropdown-overlay" @click="closeDropdown"></div>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'NavbarComponent',
  props: {
    userName: {
      type: String,
      default: 'User'
    },
    userEmail: {
      type: String,
      default: 'user@example.com'
    },
    userAvatar: {
      type: String,
      default: ''
    }
  },
  emits: ['logout', 'profile', 'settings'],
  setup(props, { emit }) {
    const isDropdownOpen = ref(false);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const closeDropdown = () => {
      isDropdownOpen.value = false;
    };

    const openSettings = () => {
      emit('settings');
    };

    const goToProfile = () => {
      closeDropdown();
      emit('profile');
    };

    const goToSettings = () => {
      closeDropdown();
      emit('settings');
    };

    const logout = () => {
      closeDropdown();
      emit('logout');
    };

    return {
      isDropdownOpen,
      toggleDropdown,
      closeDropdown,
      openSettings,
      goToProfile,
      goToSettings,
      logout
    };
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: calc(100% - 32px);
  max-width: 1200px;
}

.navbar-container {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 0.625rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* Logo */
.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.logo-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 36px;
  height: 28px;
}

.logo-text {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.025em;
}

/* User Section */
.navbar-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.625rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: transparent;
}

.user-profile:hover {
  background: rgba(241, 245, 249, 0.8);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e8f4fc 0%, #dbeafe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar svg {
  width: 18px;
  height: 18px;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
}

.dropdown-arrow {
  width: 16px;
  height: 16px;
  color: #94a3b8;
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotate {
  transform: rotate(180deg);
}

/* Settings Button */
.settings-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #94a3b8;
}

.settings-btn:hover {
  background: rgba(241, 245, 249, 0.8);
  color: #64748b;
}

.settings-btn svg {
  width: 20px;
  height: 20px;
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  width: 260px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.12),
    0 2px 10px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  z-index: 110;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%);
}

.dropdown-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e8f4fc 0%, #dbeafe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  overflow: hidden;
}

.dropdown-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-avatar svg {
  width: 22px;
  height: 22px;
}

.dropdown-user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dropdown-user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
}

.dropdown-user-email {
  font-size: 0.75rem;
  color: #64748b;
}

.dropdown-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.8), transparent);
}

.dropdown-item {
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  color: #475569;
  font-size: 0.875rem;
  text-align: left;
}

.dropdown-item:hover {
  background: rgba(248, 250, 252, 0.8);
  color: #1e293b;
}

.dropdown-item svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.dropdown-item.logout {
  color: #ef4444;
}

.dropdown-item.logout:hover {
  background: rgba(254, 242, 242, 0.8);
  color: #dc2626;
}

/* Overlay */
.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

/* Responsive */
@media (max-width: 640px) {
  .navbar {
    top: 8px;
    width: calc(100% - 16px);
  }

  .navbar-container {
    padding: 0.5rem 0.75rem;
  }

  .user-name {
    display: none;
  }

  .logo-text {
    font-size: 1rem;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }

  .logo-icon svg {
    width: 32px;
    height: 24px;
  }
}
</style>
