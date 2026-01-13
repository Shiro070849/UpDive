<template>
  <div class="relative min-h-screen bg-center bg-no-repeat bg-cover" style="background-image: url('@/assets/images/Dive_Bg.png');">
    <!-- Navbar -->
    <Navbar
      :user-name="user?.fullName || user?.username"
      :user-email="user?.email"
      @logout="handleLogout"
      @profile="handleProfile"
      @settings="handleSettings"
    />

    <!-- Upload History Content -->
    <div class="px-3 pt-16 pb-8 md:pt-20 md:px-6">
      <div class="max-w-2xl mx-auto">
        <div class="relative bg-white/85 backdrop-blur-xl rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/60 overflow-hidden">
          <!-- Glassmorphism Overlay -->
          <div class="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 via-blue-50/10 to-white/30"></div>
          <div class="relative z-10 p-3 md:p-4">
            <!-- Header Section -->
            <div class="bg-white/70 backdrop-blur-sm rounded-md p-2 md:p-2.5 mb-3 border border-slate-200/40 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="flex-shrink-0 w-7 h-7 bg-white/90 rounded-md flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-200/30">
                    <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                      <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2"/>
                    </svg>
                  </div>
                  <div class="flex flex-col flex-1 min-w-0">
                    <h2 class="text-sm font-semibold tracking-tight md:text-base text-slate-800">Upload History</h2>
                    <p class="text-[11px] text-slate-500 font-normal mt-0.5">
                      <span v-if="uploadHistory.length > 0" class="flex gap-3 text-[11px] text-slate-500" >{{ uploadHistory.length }} files uploaded</span>
                      <span v-else>No files uploaded yet</span>
                    </p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button
                    @click="goToUpload"
                    class="px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-600 text-[11px] hover:bg-gray-100 hover:border-gray-400 transition-all"
                  >
                    Back to Upload
                  </button>
                  <button
                    @click="loadUploadHistory"
                    :disabled="loadingHistory"
                    class="px-3 py-1.5 border border-blue-500 rounded-lg bg-blue-500 text-white text-[11px] hover:bg-blue-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {{ loadingHistory ? 'Loading...' : 'Refresh' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
              <!-- Loading -->
              <div v-if="loadingHistory" class="flex items-center justify-center text-sm text-gray-500 h-60">
                Loading...
              </div>

              <!-- Empty -->
              <div v-else-if="uploadHistory.length === 0" class="flex flex-col items-center justify-center gap-3 text-gray-400 h-60">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <p class="text-sm">No upload history yet</p>
              </div>

              <!-- List -->
              <div v-else class="flex flex-col gap-2">
                <div
                  v-for="log in uploadHistory"
                  :key="log.id"
                  class="flex items-center gap-3 p-2.5 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-sm transition-all"
                >
                  <!-- Icon -->
                  <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white rounded-lg shadow-sm bg-gradient-to-br from-blue-500 to-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>

                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <div class="text-[11px] font-medium text-slate-800 truncate mb-1">{{ log.file_name }}</div>
                    <div class="flex gap-3 text-[11px] text-slate-500">
                      <span class="flex gap-3 text-[11px] text-slate-500">{{ formatFileSize(log.file_size) }}</span>
                      <span class="flex gap-3 text-[11px] text-slate-500">{{ formatDate(log.uploaded_at) }}</span>
                    </div>
                  </div>

                  <!-- Link -->
                  <a
                    v-if="log.drive_url"
                    :href="log.drive_url"
                    target="_blank"
                    class="px-3 py-1.5 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg text-[11px] font-medium no-underline flex-shrink-0 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40 transition-all"
                  >
                    View
                  </a>
                </div>
              </div>
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

<style scoped>
.upload-wrapper {
  background-image: url('@/assets/images/Dive_Bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
