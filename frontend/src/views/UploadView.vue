<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 p-4 md:p-8 relative">
    <!-- Background Gradient -->
    <div class="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>

    <div class="max-w-[900px] mx-auto relative z-10">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl mb-6 shadow-xl border border-blue-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
          <svg class="w-14 h-14 drop-shadow" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
            <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
            <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
            <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
            <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
            <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
          </svg>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-slate-800 mb-2 tracking-tight">Google Drive Upload</h1>
        <p class="text-lg text-slate-500 mb-4">ระบบอัปโหลดไฟล์ไปยัง Google Drive</p>
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-slate-600 border border-slate-200 shadow-sm font-medium">
          <span>Powered by</span>
          <svg class="w-4 h-4" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
            <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
            <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
            <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
            <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
            <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
          </svg>
          <span>Google Drive</span>
        </div>
      </div>

      <!-- Upload Zone -->
      <div
        class="bg-gradient-to-br from-white to-slate-50 border-2 border-dashed rounded-2xl p-8 md:p-16 text-center cursor-pointer transition-all duration-300 shadow-sm relative overflow-hidden"
        :class="{
          'border-slate-300 hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5': !isDragging && !isUploading,
          'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 scale-[1.01] shadow-lg': isDragging,
          'cursor-not-allowed bg-slate-50 border-slate-200': isUploading
        }"
        @drop.prevent="handleDrop"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @click="triggerFileInput"
      >
        <input ref="fileInput" type="file" multiple @change="handleFileSelect" class="hidden" />

        <!-- Upload Content -->
        <div v-if="!isUploading" class="relative z-10">
          <svg class="w-16 h-16 mx-auto mb-6 text-slate-400 transition-all duration-300" :class="{ 'text-blue-500 -translate-y-1': isDragging }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="text-lg font-semibold text-slate-800 mb-1">คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</p>
          <p class="text-sm text-slate-500">รองรับ: PDF, รูปภาพ, เอกสาร, วิดีโอ (สูงสุด 50MB)</p>
        </div>

        <!-- Upload Progress -->
        <div v-else class="py-8 flex flex-col items-center">
          <CloudLoader />
          <p class="text-sm text-slate-500 font-medium mb-4">กำลังส่งไฟล์ไปยัง Google Drive... {{ uploadProgress }}%</p>
          <div class="w-full max-w-[400px] h-1.5 bg-slate-200 rounded-full overflow-hidden mx-auto">
            <div class="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300" :style="{ width: uploadProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Selected Files -->
      <div v-if="selectedFiles.length > 0 && !isUploading" class="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 mt-6 shadow-md border border-slate-100">
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
          <h3 class="text-lg font-semibold text-slate-800">ไฟล์ที่เลือก</h3>
          <span class="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">{{ selectedFiles.length }} ไฟล์</span>
        </div>
        <div class="flex flex-col gap-3">
          <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-slate-300 hover:translate-x-1 transition-all duration-200">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg text-blue-500">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 2V9H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-slate-800 truncate">{{ file.name }}</div>
              <div class="text-xs text-slate-500">{{ formatFileSize(file.size) }}</div>
            </div>
            <button @click.stop="removeFile(index)" class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white hover:scale-105 transition-all duration-200" title="ลบไฟล์">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <button @click="uploadFiles" class="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl text-base font-semibold mt-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-lg">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>อัปโหลด {{ selectedFiles.length }} ไฟล์</span>
        </button>
      </div>

      <!-- Uploaded Files -->
      <div v-if="uploadedFiles.length > 0" class="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 mt-6 shadow-md border border-slate-100">
        <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
          <h3 class="text-lg font-semibold text-slate-800">ไฟล์ที่อัปโหลดแล้ว</h3>
          <span class="text-sm text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full font-medium">{{ uploadedFiles.length }} ไฟล์</span>
        </div>
        <div class="flex flex-col gap-3">
          <div v-for="file in uploadedFiles" :key="file.id" class="flex flex-wrap items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg text-green-600">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-slate-800 truncate">{{ file.name }}</div>
              <div class="text-xs text-slate-500">{{ formatFileSize(file.size) }}</div>
            </div>
            <a :href="file.webViewLink" target="_blank" class="flex-shrink-0 flex items-center gap-2 bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200 sm:w-auto w-full justify-center mt-2 sm:mt-0">
              <svg class="w-4 h-4" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
                <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
                <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
                <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
                <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
                <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
              </svg>
              <span>เปิดใน Drive</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="flex items-center justify-center gap-3 bg-red-50 text-red-600 px-6 py-4 rounded-xl mt-6 font-medium border border-red-200">
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import uploadService from '../services/upload.service';
import CloudLoader from '../components/CloudLoader.vue';

export default {
  name: 'UploadView',
  components: {
    CloudLoader
  },
  setup() {
    const fileInput = ref(null);
    const selectedFiles = ref([]);
    const uploadedFiles = ref([]);
    const isDragging = ref(false);
    const isUploading = ref(false);
    const uploadProgress = ref(0);
    const errorMessage = ref('');

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files);
      addFiles(files);
    };

    const handleDrop = (event) => {
      isDragging.value = false;
      const files = Array.from(event.dataTransfer.files);
      addFiles(files);
    };

    const addFiles = (files) => {
      const validFiles = files.filter(file => {
        if (file.size > 50 * 1024 * 1024) {
          errorMessage.value = `ไฟล์ ${file.name} มีขนาดใหญ่เกิน 50MB`;
          return false;
        }
        return true;
      });
      selectedFiles.value = [...selectedFiles.value, ...validFiles];
      errorMessage.value = '';
    };

    const removeFile = (index) => {
      selectedFiles.value.splice(index, 1);
    };

    const uploadFiles = async () => {
      if (selectedFiles.value.length === 0) return;

      isUploading.value = true;
      uploadProgress.value = 0;
      errorMessage.value = '';

      try {
        let result;
        if (selectedFiles.value.length === 1) {
          result = await uploadService.uploadFile(
            selectedFiles.value[0],
            (progress) => { uploadProgress.value = progress; }
          );
          uploadedFiles.value.unshift(result.file);
        } else {
          result = await uploadService.uploadMultipleFiles(
            selectedFiles.value,
            (progress) => { uploadProgress.value = progress; }
          );
          uploadedFiles.value.unshift(...result.files);
        }

        selectedFiles.value = [];
        fileInput.value.value = '';
        isUploading.value = false;
        uploadProgress.value = 0;
      } catch (error) {
        console.error('Upload error:', error);
        errorMessage.value = error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปโหลด';
        isUploading.value = false;
        uploadProgress.value = 0;
      }
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return {
      fileInput,
      selectedFiles,
      uploadedFiles,
      isDragging,
      isUploading,
      uploadProgress,
      errorMessage,
      triggerFileInput,
      handleFileSelect,
      handleDrop,
      removeFile,
      uploadFiles,
      formatFileSize
    };
  }
};
</script>
