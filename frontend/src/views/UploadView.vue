<template>
  <div class="min-h-screen relative upload-wrapper">
    <!-- Navbar -->
    <Navbar
      :user-name="userName"
      :user-email="userEmail"
      @logout="handleLogout"
      @profile="handleProfile"
      @settings="handleSettings"
    />

    <!-- Main Content -->
    <div class="pt-24 md:pt-28 px-4 pb-16 md:px-8">
      <div class="max-w-3xl mx-auto relative z-0">
        <!-- Main Content Card (Enhanced Glassmorphism) -->
        <div class="relative bg-white/75 backdrop-blur-3xl rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.5)_inset] border border-white/80 p-8 md:p-10 overflow-hidden">
          <!-- Glassmorphism Overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-blue-50/20 to-white/40 pointer-events-none"></div>
          <div class="relative z-10">
          <!-- Header Section (Small box at top) -->
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-5 md:p-6 mb-10 border border-slate-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div class="flex items-center gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-slate-200/30">
                <svg class="w-8 h-8" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
                  <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
                  <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
                  <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
                  <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
                  <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h1 class="text-2xl md:text-3xl font-semibold text-slate-800 mb-1.5 tracking-tight">Upload files to Google Drive</h1>
                <p class="text-sm md:text-base text-slate-500 font-normal">Securely store your files in Google Drive</p>
              </div>
            </div>
          </div>

          <!-- Upload Zone - HERO Section with Glassmorphism -->
          <div
            class="relative rounded-3xl p-16 md:p-20 text-center transition-all duration-300 cursor-pointer mb-10"
            :class="{
              'cursor-not-allowed': isUploading
            }"
            @drop.prevent="handleDrop"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @click="!isUploading && triggerFileInput()"
          >
            <input ref="fileInput" type="file" multiple @change="handleFileSelect" class="hidden" />

            <!-- Layered Glassmorphism Background -->
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 via-blue-50/30 to-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(59,130,246,0.12)]"></div>
            
            <!-- Inner Glow Layer -->
            <div 
              class="absolute inset-[1px] rounded-3xl"
              :class="{
                'bg-gradient-to-br from-blue-100/20 via-white/30 to-blue-50/20 shadow-[inset_0_2px_20px_rgba(59,130,246,0.15),inset_0_0_40px_rgba(255,255,255,0.5)]': !isDragging && !isUploading,
                'bg-gradient-to-br from-blue-200/40 via-blue-100/50 to-blue-200/30 shadow-[inset_0_2px_30px_rgba(59,130,246,0.25),inset_0_0_50px_rgba(255,255,255,0.6)]': isDragging,
                'bg-gradient-to-br from-slate-100/20 via-slate-50/30 to-slate-100/20 shadow-[inset_0_2px_20px_rgba(0,0,0,0.05)]': isUploading
              }"
            ></div>

            <!-- Subtle Border Accent (replacing dashed border) -->
            <div class="absolute inset-0 rounded-3xl border-2 border-transparent" :class="{
              'border-blue-300/30': !isDragging && !isUploading,
              'border-blue-400/50': isDragging,
              'border-slate-200/20': isUploading
            }"></div>

            <!-- Upload Content -->
            <div v-if="!isUploading" class="relative z-10">
              <!-- Icon Container - Glassmorphism Style -->
              <div class="w-16 h-16 mx-auto mb-8 flex items-center justify-center relative">
                <!-- Subtle Blue Glow -->
                <div class="absolute inset-0 bg-blue-400/15 rounded-xl blur-md"></div>
                
                <!-- Glassmorphism Container -->
                <div class="relative w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/80 shadow-[0_2px_8px_rgba(59,130,246,0.12),0_0_0_1px_rgba(59,130,246,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)]">
                  <!-- Solid Cloud Upload Icon -->
                  <svg class="w-8 h-8 text-blue-600 transition-all duration-300" :class="{ 'text-blue-700 scale-105': isDragging }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Cloud -->
                    <path d="M7 18C4.23858 18 2 15.7614 2 13C2 10.2386 4.23858 8 7 8C7.5 6.5 9 5.5 10.5 5.5C12.5 5.5 14 7 14 9C14.7614 9 15.5 9.23858 15.5 10C15.5 10.7614 14.7614 11 14 11H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor" fill-opacity="0.1"/>
                    <!-- Arrow -->
                    <path d="M12 11V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 14L12 11L15 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <p class="text-lg md:text-xl font-medium text-slate-700 mb-8">Drag & drop files here, or</p>
              
              <!-- Medium-sized Elegant Button -->
              <button
                @click.stop="triggerFileInput"
                class="relative inline-flex items-center gap-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl text-base font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-[0_4px_12px_rgba(59,130,246,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_6px_16px_rgba(59,130,246,0.4),0_0_0_1px_rgba(255,255,255,0.15)_inset]"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 2V9H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Select Files
              </button>
            </div>
          </div>

          <!-- Upload Status Section (แสดงเฉพาะตอนกำลังอัปโหลด) -->
          <div v-if="isUploading && uploadingFiles.length > 0" class="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7V5C3 3.89543 3.89543 3 5 3H9.58579C9.851 3 10.1054 3.10536 10.2929 3.29289L12.7071 5.70711C12.8946 5.89464 13.149 6 13.4142 6H19C20.1046 6 21 6.89543 21 8V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-sm text-slate-500">
                  Uploading to: <span class="font-medium text-slate-700">{{ currentFolderPath }}</span>
                </p>
              </div>
              <button
                @click="openFolderModal"
                class="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Change Folder
              </button>
            </div>

            <!-- Uploading Files List -->
            <div class="space-y-3 mb-5">
              <div v-for="(file, index) in uploadingFiles" :key="file.id || index" class="bg-white/80 rounded-xl p-4 border border-slate-200/60">
                <div class="flex items-center gap-3 mb-3">
                  <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg" :class="file.status === 'completed' ? 'bg-green-50 text-green-600' : getFileIconClass(file.name)">
                    <svg v-if="file.status === 'completed'" class="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else-if="getFileIcon(file.name) === 'pdf'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 13H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M16 17H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M10 9H9H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else-if="getFileIcon(file.name) === 'image'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else-if="getFileIcon(file.name) === 'video'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-slate-700 truncate mb-0.5">{{ file.name }}</div>
                    <div v-if="file.status === 'uploading'" class="text-xs text-slate-500">{{ formatFileSize(file.uploaded || 0) }} / {{ formatFileSize(file.size) }}</div>
                    <div v-else-if="file.status === 'completed'" class="text-xs text-green-600 font-medium">Upload completed</div>
                    <div v-else class="text-xs text-red-500 font-medium">Upload failed</div>
                  </div>
                  <div v-if="file.status === 'uploading'" class="flex-shrink-0 text-sm font-medium text-slate-600">{{ file.progress || 0 }}%</div>
                  <div v-else-if="file.status === 'completed'" class="flex items-center gap-3">
                    <a v-if="getCompletedFileLink(file.name)" :href="getCompletedFileLink(file.name)" target="_blank" class="text-xs text-blue-500 hover:text-blue-600 font-medium">Open in Drive</a>
                    <button v-if="getCompletedFileLink(file.name)" @click.stop="copyFileLink(file.name)" class="text-xs text-slate-500 hover:text-slate-600 font-medium">Copy Link</button>
                  </div>
                </div>
                <div v-if="file.status === 'uploading'" class="w-full h-1 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300"
                    :style="{ width: (file.progress || 0) + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Total Progress (แสดงเฉพาะเมื่อมีหลายไฟล์) -->
            <div v-if="uploadingFiles.length > 1" class="bg-slate-50/60 rounded-xl p-4 border border-slate-200/40 mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-slate-600">Total progress</span>
                <span class="text-sm font-medium text-slate-700">{{ totalProgress }}%</span>
              </div>
              <div class="w-full h-1 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-300"
                  :style="{ width: totalProgress + '%' }"
                ></div>
              </div>
            </div>

            <!-- Clear List Button -->
            <div class="flex justify-end pt-3 border-t border-slate-200/40">
              <button
                @click="clearCompletedFiles"
                class="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors flex items-center gap-1.5"
                :disabled="completedFilesCount === 0"
              >
                <span>Clear completed</span>
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Selected Files -->
          <div v-if="selectedFiles.length > 0 && !isUploading" class="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div class="flex items-center justify-between mb-5 pb-4 border-b border-slate-200/40">
              <h3 class="text-lg font-semibold text-slate-700">Selected Files</h3>
              <span class="text-sm text-slate-500 bg-slate-100/60 px-3 py-1 rounded-full font-medium">{{ selectedFiles.length }} {{ selectedFiles.length === 1 ? 'file' : 'files' }}</span>
            </div>
            <div class="flex flex-col gap-3 mb-6">
              <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center gap-4 p-4 bg-white/70 rounded-xl border border-slate-200/50 hover:border-slate-300/60 transition-all duration-200">
                <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-50/80 rounded-lg text-blue-500">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13 2V9H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-slate-700 truncate">{{ file.name }}</div>
                  <div class="text-xs text-slate-500 mt-0.5">{{ formatFileSize(file.size) }}</div>
                </div>
                <button @click.stop="removeFile(index)" class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-50/80 text-red-500 rounded-lg hover:bg-red-100/80 transition-all duration-200" title="Remove file">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <button @click="uploadFiles" class="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-5 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 hover:shadow-[0_2px_8px_rgba(59,130,246,0.25)] transition-all duration-200 shadow-[0_1px_4px_rgba(59,130,246,0.2)]">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17 8L12 3L7 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Upload {{ selectedFiles.length }} {{ selectedFiles.length === 1 ? 'file' : 'files' }}</span>
            </button>
          </div>

          <!-- Uploaded Files -->
          <div v-if="uploadedFiles.length > 0 && !isUploading" class="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div class="flex items-center justify-between mb-5 pb-4 border-b border-slate-200/40">
              <h3 class="text-lg font-semibold text-slate-700">Uploaded Files</h3>
              <span class="text-sm text-green-600 bg-green-50/60 px-3 py-1 rounded-full font-medium">{{ uploadedFiles.length }} {{ uploadedFiles.length === 1 ? 'file' : 'files' }}</span>
            </div>
            <div class="flex flex-col gap-3">
              <div v-for="file in uploadedFiles" :key="file.id" class="flex flex-wrap items-center gap-4 p-4 bg-white/70 rounded-xl border border-green-200/40 hover:border-green-300/60 transition-all duration-200">
                <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-50/80 rounded-lg text-green-600">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-slate-700 truncate">{{ file.name }}</div>
                  <div class="text-xs text-slate-500 mt-0.5">{{ formatFileSize(file.size) }}</div>
                </div>
                <a :href="file.webViewLink" target="_blank" class="flex-shrink-0 flex items-center gap-2 bg-white text-slate-600 px-4 py-2 rounded-lg text-sm font-medium border border-slate-200/60 hover:bg-slate-50/80 hover:border-slate-300/60 transition-all duration-200 sm:w-auto w-full justify-center mt-2 sm:mt-0">
                  <svg class="w-4 h-4" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
                    <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
                    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
                    <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
                    <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
                    <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
                  </svg>
                  <span>Open in Drive</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="flex items-center justify-center gap-3 bg-red-50/60 text-red-600 px-6 py-4 rounded-xl mt-6 font-medium border border-red-200/40">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 8V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M12 16H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- Footer -->
          <div class="mt-10 pt-6 border-t border-slate-200/40 text-center">
            <div class="flex items-center justify-center gap-2 mb-2">
              <svg class="w-5 h-5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
                <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
                <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
                <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
                <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
                <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
              </svg>
              <span class="text-sm text-slate-500 font-medium">Powered by Google Drive</span>
            </div>
            <p class="text-xs text-slate-400">Files are uploaded securely to your designated Google Drive folder.</p>
          </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Folder Selection Modal -->
    <div v-if="showFolderModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="closeFolderModal">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-white/50">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-slate-800">Select Folder</h3>
          <button @click="closeFolderModal" class="text-slate-400 hover:text-slate-600 transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="mb-4">
          <p class="text-sm text-slate-600 mb-4">Folder selection feature will be implemented here.</p>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm text-slate-500">Current folder: <span class="font-medium text-slate-700">{{ currentFolderPath }}</span></p>
          </div>
        </div>
        <div class="flex gap-3 justify-end">
          <button @click="closeFolderModal" class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Cancel
          </button>
          <button @click="confirmFolderSelection" class="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- AI Chatbot -->
    <ChatBot />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import uploadService from '../services/upload.service';
import Navbar from '../components/Navbar.vue';
import ChatBot from '../components/ChatBot.vue';

export default {
  name: 'UploadView',
  components: {
    Navbar,
    ChatBot
  },
  setup() {
    const router = useRouter();
    const fileInput = ref(null);
    const selectedFiles = ref([]);
    const uploadedFiles = ref([]);
    const uploadingFiles = ref([]); // ไฟล์ที่กำลังอัปโหลดพร้อม progress
    const isDragging = ref(false);
    const isUploading = ref(false);
    const uploadProgress = ref(0);
    const errorMessage = ref('');
    const showFolderModal = ref(false);
    const currentFolderPath = ref('My Drive / UpDive / Uploads');

    // User info (will be replaced with actual auth data later)
    const userName = ref('User');
    const userEmail = ref('user@example.com');

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
      errorMessage.value = '';

      // สร้าง uploadingFiles array พร้อม progress
      uploadingFiles.value = selectedFiles.value.map((file, index) => ({
        id: `upload-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        file: file,
        progress: 0,
        uploaded: 0,
        status: 'uploading' // uploading, completed, error
      }));

      try {
        // อัปโหลดทีละไฟล์เพื่อให้มี progress รายไฟล์
        const results = [];
        for (let i = 0; i < uploadingFiles.value.length; i++) {
          const uploadItem = uploadingFiles.value[i];
          try {
            const result = await uploadService.uploadFile(
              uploadItem.file,
              (progress) => {
                uploadItem.progress = progress;
                uploadItem.uploaded = Math.round((uploadItem.size * progress) / 100);
              }
            );
            uploadItem.status = 'completed';
            uploadItem.progress = 100;
            results.push(result.file);
          } catch (error) {
            uploadItem.status = 'error';
            console.error(`Upload error for ${uploadItem.name}:`, error);
          }
        }

        // ย้ายไฟล์ที่เสร็จแล้วไป uploadedFiles
        uploadedFiles.value.unshift(...results);

        // รอสักครู่แล้วลบไฟล์ที่เสร็จ/error ออกจาก uploadingFiles
        setTimeout(() => {
          uploadingFiles.value = uploadingFiles.value.filter(f => f.status === 'uploading');
          if (uploadingFiles.value.length === 0) {
            isUploading.value = false;
          }
        }, 1000);

        selectedFiles.value = [];
        fileInput.value.value = '';
      } catch (error) {
        console.error('Upload error:', error);
        errorMessage.value = error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปโหลด';
        isUploading.value = false;
        uploadingFiles.value = [];
      }
    };

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    // File icon helpers (UI only)
    const getFileIcon = (fileName) => {
      const ext = fileName.split('.').pop()?.toLowerCase();
      if (['pdf'].includes(ext)) {
        return 'pdf';
      } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
        return 'image';
      } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) {
        return 'video';
      }
      return 'file';
    };

    const getFileIconClass = (fileName) => {
      const ext = fileName.split('.').pop()?.toLowerCase();
      if (['pdf'].includes(ext)) {
        return 'bg-red-50 text-red-600';
      } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
        return 'bg-green-50 text-green-600';
      } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(ext)) {
        return 'bg-blue-50 text-blue-600';
      }
      return 'bg-slate-50 text-slate-600';
    };

    // Helper to get completed file link from uploadedFiles
    const getCompletedFileLink = (fileName) => {
      const uploadedFile = uploadedFiles.value.find(f => f.name === fileName);
      return uploadedFile?.webViewLink || null;
    };

    // Copy file link to clipboard
    const copyFileLink = async (fileName) => {
      const link = getCompletedFileLink(fileName);
      if (link) {
        try {
          await navigator.clipboard.writeText(link);
          // You could add a toast notification here
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
      }
    };

    // Navbar event handlers
    const handleLogout = () => {
      // Clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login
      router.push('/login');
    };

    const handleProfile = () => {
      router.push('/profile');
    };

    const handleSettings = () => {
      console.log('Settings clicked');
      // TODO: Open settings modal or navigate to settings page
    };

    // Folder Modal functions
    const openFolderModal = () => {
      showFolderModal.value = true;
    };

    const closeFolderModal = () => {
      showFolderModal.value = false;
    };

    const confirmFolderSelection = () => {
      // TODO: Implement folder selection logic
      closeFolderModal();
    };

    // Clear completed files
    const clearCompletedFiles = () => {
      uploadedFiles.value = uploadedFiles.value.filter(file => {
        const uploadingItem = uploadingFiles.value.find(uf => uf.name === file.name);
        return !uploadingItem || uploadingItem.status !== 'completed';
      });
      uploadingFiles.value = uploadingFiles.value.filter(f => f.status === 'uploading');
    };

    // Computed properties
    const totalProgress = computed(() => {
      if (uploadingFiles.value.length === 0) return 0;
      const total = uploadingFiles.value.reduce((sum, file) => sum + (file.progress || 0), 0);
      return Math.round(total / uploadingFiles.value.length);
    });

    const completedFilesCount = computed(() => {
      return uploadingFiles.value.filter(f => f.status === 'completed' || f.status === 'error').length;
    });

    return {
      fileInput,
      selectedFiles,
      uploadedFiles,
      isDragging,
      isUploading,
      uploadProgress,
      errorMessage,
      userName,
      userEmail,
      triggerFileInput,
      handleFileSelect,
      handleDrop,
      removeFile,
      uploadFiles,
      formatFileSize,
      handleLogout,
      handleProfile,
      handleSettings,
      uploadingFiles,
      showFolderModal,
      currentFolderPath,
      totalProgress,
      completedFilesCount,
      openFolderModal,
      closeFolderModal,
      confirmFolderSelection,
      clearCompletedFiles,
      getFileIcon,
      getFileIconClass,
      getCompletedFileLink,
      copyFileLink
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
