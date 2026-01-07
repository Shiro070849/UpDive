<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
    <!-- Nav Bar -->
    <div class="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      <div class="flex items-center gap-4 text-white">
        <span class="text-base">Welcome, <strong>{{ user?.fullName || user?.username }}</strong></span>
        <span
          class="py-1 px-3 rounded-xl text-xs font-semibold uppercase"
          :class="{
            'bg-red-400 text-white': user?.role === 'admin',
            'bg-teal-400 text-white': user?.role === 'user'
          }"
        >
          {{ user?.role }}
        </span>
      </div>
      <button
        class="py-2 px-6 bg-white/20 text-white border-2 border-white rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-white hover:text-indigo-500"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>

    <!-- Main Container -->
    <div class="flex-1 flex flex-col justify-center items-center text-center text-white p-8">
      <h1 class="text-5xl mb-4 font-bold">Welcome to UpDive System</h1>
      <p class="text-2xl opacity-90 mb-12">Choose an action below</p>

      <!-- Actions -->
      <div class="flex gap-8 flex-wrap justify-center">
        <router-link
          to="/upload"
          class="bg-white text-gray-800 p-8 rounded-xl w-64 no-underline shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)]"
        >
          <div class="text-5xl mb-4">📤</div>
          <h3 class="text-2xl mb-2 text-indigo-500">Upload Files</h3>
          <p class="text-base opacity-70 mb-0">Upload files to Google Drive</p>
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
