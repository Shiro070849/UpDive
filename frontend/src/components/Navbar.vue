<template>
  <nav class="fixed top-1.5 sm:top-3 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-0.75rem)] sm:w-[calc(100%-1.5rem)] max-w-[1000px]">
    <div class="bg-white/85 backdrop-blur-xl rounded-lg px-2.5 sm:px-3 py-1.5 flex items-center justify-between shadow-[0_3px_16px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/50">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <div class="flex items-center justify-center w-7 h-7">
          <!-- Cloud with checkmark icon -->
          <svg class="w-7 h-5" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <span class="text-sm sm:text-base font-bold tracking-tight text-slate-800">UpDive</span>
      </div>

      <!-- User Section -->
      <div class="relative flex items-center gap-2">
        <!-- User Profile -->
        <div
          class="flex items-center gap-1 px-1.5 py-0.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-100/80"
          @click="toggleDropdown"
        >
          <div class="flex items-center justify-center overflow-hidden text-blue-500 rounded-full w-6 h-6 bg-gradient-to-br from-blue-100 to-blue-200">
            <img v-if="userAvatar" :src="userAvatar" :alt="userName" class="object-cover w-full h-full" />
            <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
              <path d="M4 20C4 17 7.58 14.5 12 14.5C16.42 14.5 20 17 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="text-[11px] font-medium text-slate-600">{{ userName }}</span>
          <svg
            class="w-3.5 h-3.5 transition-transform duration-200 text-slate-400"
            :class="{ 'rotate-180': isDropdownOpen }"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Settings Button -->
        <button
          class="flex items-center justify-center w-7 h-7 transition-all duration-200 bg-transparent border-0 rounded-lg cursor-pointer text-slate-400 hover:bg-slate-100/80 hover:text-slate-600"
          @click="openSettings"
          title="Settings"
        >
          <svg class="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="-translate-y-2 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="-translate-y-2 opacity-0"
        >
          <div
            v-if="isDropdownOpen"
            class="absolute top-[calc(100%+0.4rem)] right-0 w-[170px] bg-white/98 backdrop-blur-xl rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200/60 overflow-hidden z-[110]"
          >
            <!-- Header -->
            <div class="p-2 flex items-center gap-1.5 bg-gradient-to-br from-slate-50/90 to-slate-100/90">
              <div class="flex items-center justify-center w-7 h-7 overflow-hidden text-blue-500 rounded-full shadow-sm bg-gradient-to-br from-blue-100 to-blue-200">
                <img v-if="userAvatar" :src="userAvatar" :alt="userName" class="object-cover w-full h-full" />
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                  <path d="M4 20C4 17 7.58 14.5 12 14.5C16.42 14.5 20 17 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="flex flex-col gap-0.5">
                <span class="text-[11px] font-semibold text-slate-800">{{ userName }}</span>
                <span class="text-[9px] text-slate-500">{{ userEmail }}</span>
              </div>
            </div>

            <!-- Divider -->
            <div class="h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"></div>

            <!-- Menu Items -->
            <div class="py-0.5">
              <button
                class="w-full py-1 px-2 flex items-center gap-1.5 border-0 bg-transparent cursor-pointer transition-all duration-150 text-slate-600 text-xs text-left hover:bg-blue-50/60 hover:text-blue-600 rounded-none"
                @click="goToProfile"
              >
                <svg class="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                  <path d="M4 20C4 17 7.58 14.5 12 14.5C16.42 14.5 20 17 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span class="text-[11px]">Profile</span>
              </button>

              <button
                class="w-full py-1 px-2 flex items-center gap-1.5 border-0 bg-transparent cursor-pointer transition-all duration-150 text-slate-600 text-xs text-left hover:bg-blue-50/60 hover:text-blue-600 rounded-none"
                @click="goToSettings"
              >
                <svg class="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span class="text-[11px]">Settings</span>
              </button>
            </div>

            <!-- Divider -->
            <div class="h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent"></div>

            <!-- Logout -->
            <div class="py-0.5">
              <button
                class="w-full py-1 px-2 flex items-center gap-1.5 border-0 bg-transparent cursor-pointer transition-all duration-150 text-red-500 text-xs text-left hover:bg-red-50/70 hover:text-red-600 rounded-none"
                @click="logout"
              >
                <svg class="w-[13px] h-[13px] shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-[11px]">Logout</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Overlay for closing dropdown -->
    <div
      v-if="isDropdownOpen"
      class="fixed top-0 left-0 right-0 bottom-0 z-[99]"
      @click="closeDropdown"
    ></div>
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

