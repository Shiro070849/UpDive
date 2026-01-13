<template>
  <div class="min-h-screen bg-cover bg-center bg-no-repeat" style="background-image: url('@/assets/images/Dive_Bg.png')">
    <!-- Navbar -->
    <Navbar
      :user-name="user?.fullName || user?.username"
      :user-email="user?.email"
      @logout="handleLogout"
      @profile="handleProfile"
      @settings="handleSettings"
    />

    <!-- Upload History Content -->
    <div class="flex justify-center p-4 sm:p-8">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[calc(100vh-140px)]">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <h2 class="text-xl sm:text-2xl font-semibold text-gray-800">Upload History</h2>
            <span v-if="uploadHistory.length > 0" class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {{ uploadHistory.length }} files
            </span>
          </div>
          <div class="flex gap-3">
            <button
              @click="goToUpload"
              class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-600 text-sm hover:bg-gray-100 hover:border-gray-400 transition-all"
            >
              Back to Upload
            </button>
            <button
              @click="loadUploadHistory"
              :disabled="loadingHistory"
              class="px-4 py-2 border border-blue-500 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {{ loadingHistory ? 'Loading...' : 'Refresh' }}
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Loading -->
          <div v-if="loadingHistory" class="flex justify-center items-center h-72 text-gray-500">
            Loading...
          </div>

          <!-- Empty -->
          <div v-else-if="uploadHistory.length === 0" class="flex flex-col justify-center items-center h-72 text-gray-400 gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <p class="text-base">No upload history yet</p>
          </div>

          <!-- List -->
          <div v-else class="flex flex-col gap-3">
            <div
              v-for="log in uploadHistory"
              :key="log.id"
              class="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 hover:translate-x-1 transition-all"
            >
              <!-- Icon -->
              <div class="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="text-base font-medium text-gray-800 truncate mb-1">{{ log.file_name }}</div>
                <div class="flex gap-4 sm:gap-6 text-sm text-gray-500 flex-col sm:flex-row">
                  <span>{{ formatFileSize(log.file_size) }}</span>
                  <span>{{ formatDate(log.uploaded_at) }}</span>
                </div>
              </div>

              <!-- Link -->
              <a
                v-if="log.drive_url"
                :href="log.drive_url"
                target="_blank"
                class="px-5 py-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium no-underline flex-shrink-0 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 transition-all"
              >
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Chatbot -->
    <ChatBot />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import ChatBot from '../components/ChatBot.vue';
import uploadService from '../services/upload.service';

export default {
  name: 'ProfileView',
  components: {
    Navbar,
    ChatBot
  },
  setup() {
    const router = useRouter();
    const user = ref(null);
    const uploadHistory = ref([]);
    const loadingHistory = ref(false);

    const loadUploadHistory = async () => {
      loadingHistory.value = true;
      try {
        const response = await uploadService.getUploadHistory();
        if (response.success) {
          uploadHistory.value = response.logs;
        }
      } catch (error) {
        console.error('Error loading upload history:', error);
      } finally {
        loadingHistory.value = false;
      }
    };

    const formatFileSize = (bytes) => {
      if (!bytes) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateStr) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    onMounted(() => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        user.value = JSON.parse(userStr);
      }
      loadUploadHistory();
    });

    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    };

    const handleProfile = () => {
      router.push('/profile');
    };

    const handleSettings = () => {
      console.log('Settings clicked');
    };

    const goToUpload = () => {
      router.push('/upload');
    };

    return {
      user,
      uploadHistory,
      loadingHistory,
      loadUploadHistory,
      formatFileSize,
      formatDate,
      handleLogout,
      handleProfile,
      handleSettings,
      goToUpload
    };
  }
};
</script>
