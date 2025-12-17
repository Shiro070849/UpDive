<template>
  <div class="upload-page">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 18C5.17107 18.4117 4 19.0443 4 19.7537C4 20.9943 7.58172 22 12 22C16.4183 22 20 20.9943 20 19.7537C20 19.0443 18.8289 18.4117 17 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 15V3M12 3L16 7M12 3L8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="title">Upload to Google Drive</h1>
        <p class="subtitle">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์</p>
      </div>

      <!-- Upload Zone -->
      <div
        class="upload-zone"
        :class="{ 'drag-over': isDragging, 'uploading': isUploading }"
        @drop.prevent="handleDrop"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @click="triggerFileInput"
      >
        <input
          ref="fileInput"
          type="file"
          multiple
          @change="handleFileSelect"
          style="display: none"
        />

        <div v-if="!isUploading" class="upload-content">
          <svg class="upload-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p class="main-text">คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่</p>
          <p class="sub-text">รองรับ: PDF, รูปภาพ, เอกสาร, วิดีโอ (สูงสุด 50MB)</p>
        </div>

        <div v-else class="upload-progress">
          <div class="spinner"></div>
          <p class="progress-text">กำลังอัปโหลด {{ uploadProgress }}%</p>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Selected Files -->
      <div v-if="selectedFiles.length > 0 && !isUploading" class="files-section">
        <div class="section-header">
          <h3 class="section-title">ไฟล์ที่เลือก</h3>
          <span class="file-count">{{ selectedFiles.length }} ไฟล์</span>
        </div>
        <div class="file-list">
          <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
            <div class="file-icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13 2V9H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="file-info">
              <div class="file-name">{{ file.name }}</div>
              <div class="file-size">{{ formatFileSize(file.size) }}</div>
            </div>
            <button @click="removeFile(index)" class="remove-btn" title="ลบไฟล์">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <button @click="uploadFiles" class="upload-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 8L12 3L7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>อัปโหลด {{ selectedFiles.length }} ไฟล์</span>
        </button>
      </div>

      <!-- Uploaded Files -->
      <div v-if="uploadedFiles.length > 0" class="files-section">
        <div class="section-header">
          <h3 class="section-title">ไฟล์ที่อัปโหลดแล้ว</h3>
          <span class="file-count success">{{ uploadedFiles.length }} ไฟล์</span>
        </div>
        <div class="file-list">
          <div v-for="file in uploadedFiles" :key="file.id" class="file-item success">
            <div class="file-icon-wrapper success">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="file-info">
              <div class="file-name">{{ file.name }}</div>
              <div class="file-size">{{ formatFileSize(file.size) }}</div>
            </div>
            <a :href="file.webViewLink" target="_blank" class="view-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 3H21V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>เปิดใน Drive</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-message">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default {
  name: 'UploadView',
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
            (progress) => {
              uploadProgress.value = progress;
            }
          );
          uploadedFiles.value.unshift(result.file);
        } else {
          result = await uploadService.uploadMultipleFiles(
            selectedFiles.value,
            (progress) => {
              uploadProgress.value = progress;
            }
          );
          uploadedFiles.value.unshift(...result.files);
        }

        selectedFiles.value = [];
        fileInput.value.value = '';

        setTimeout(() => {
          isUploading.value = false;
          uploadProgress.value = 0;
        }, 500);

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

<style scoped>
* {
  box-sizing: border-box;
}

.upload-page {
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 1rem;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 3rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1rem;
  color: #64748b;
  font-weight: 400;
}

/* Upload Zone */
.upload-zone {
  background: white;
  border: 2px dashed #cbd5e0;
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.upload-zone:hover {
  border-color: #3b82f6;
  background: #f8fafc;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.upload-zone.drag-over {
  border-color: #3b82f6;
  background: #eff6ff;
  border-style: solid;
  transform: scale(1.01);
}

.upload-zone.uploading {
  cursor: not-allowed;
  background: #f8fafc;
  border-color: #e2e8f0;
}

.upload-icon {
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.upload-zone:hover .upload-icon {
  color: #3b82f6;
}

.main-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.sub-text {
  font-size: 0.875rem;
  color: #64748b;
}

/* Upload Progress */
.upload-progress {
  padding: 2rem 0;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.progress-text {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 1rem;
}

.progress-bar {
  width: 100%;
  max-width: 400px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin: 0 auto;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  transition: width 0.3s ease;
  border-radius: 3px;
}

/* Files Section */
.files-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.file-count {
  font-size: 0.875rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.file-count.success {
  background: #dcfce7;
  color: #15803d;
}

/* File List */
.file-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.file-item:hover {
  background: #f1f5f9;
  border-color: #cbd5e0;
}

.file-item.success {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.file-icon-wrapper {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff6ff;
  border-radius: 10px;
  color: #3b82f6;
}

.file-icon-wrapper.success {
  background: #dcfce7;
  color: #16a34a;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 0.8125rem;
  color: #64748b;
}

.remove-btn {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #dc2626;
  color: white;
  transform: scale(1.05);
}

/* Buttons */
.upload-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.upload-btn:active {
  transform: translateY(0);
}

.view-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #eff6ff;
  color: #2563eb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.view-btn:hover {
  background: #2563eb;
  color: white;
}

/* Error Message */
.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: #fef2f2;
  color: #dc2626;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-top: 1.5rem;
  font-weight: 500;
  border: 1px solid #fecaca;
}

/* Responsive */
@media (max-width: 640px) {
  .upload-page {
    padding: 1rem 0.75rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
  }

  .upload-zone {
    padding: 3rem 1.5rem;
  }

  .files-section {
    padding: 1.5rem;
  }

  .file-item {
    flex-wrap: wrap;
  }

  .view-btn {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
}
</style>
