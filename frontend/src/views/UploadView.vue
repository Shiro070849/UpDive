<template>
  <div class="relative min-h-screen upload-wrapper">
    <!-- Navbar -->
    <Navbar
      :user-name="userName"
      :user-email="userEmail"
      @logout="handleLogout"
      @profile="handleProfile"
      @settings="handleSettings"
    />

    <!-- Main Content -->
    <div class="px-3 pt-16 pb-8 md:pt-20 md:px-6">
      <div class="relative z-0 max-w-3xl mx-auto">
        <!-- Main Content Card (Enhanced Glassmorphism) -->
        <div class="relative bg-white/85 backdrop-blur-xl rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] border border-white/60 p-3 md:p-4 overflow-hidden">
          <!-- Glassmorphism Overlay -->
          <div class="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 via-blue-50/10 to-white/30"></div>
          <div class="relative z-10">
          <!-- Header Section (Small box at top) -->
          <div class="bg-white/70 backdrop-blur-sm rounded-md p-2 md:p-2.5 mb-3 border border-slate-200/40 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div class="flex items-center gap-2">
              <div class="flex-shrink-0 w-7 h-7 bg-white/90 rounded-md flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-200/30">
                <svg class="w-4 h-4" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
                  <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
                  <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
                  <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
                  <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
                  <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <h1 class="text-sm md:text-base font-semibold text-slate-800 mb-0.5 tracking-tight">Upload files to Google Drive</h1>
                <p class="text-[11px] text-slate-500 font-normal">Securely store your files in Google Drive</p>
              </div>
            </div>
          </div>

          <!-- Upload Zone - HERO Section with Glassmorphism -->
          <div
            class="relative p-3 mb-3 text-center transition-all duration-300 rounded-lg cursor-pointer md:p-4"
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
            <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-white/40 via-blue-50/20 to-white/50 backdrop-blur-lg border border-white/60 shadow-[0_4px_16px_rgba(59,130,246,0.08)]"></div>

            <!-- Inner Glow Layer -->
            <div
              class="absolute inset-[1px] rounded-lg"
              :class="{
                'bg-gradient-to-br from-blue-100/15 via-white/25 to-blue-50/15 shadow-[inset_0_1px_12px_rgba(59,130,246,0.1),inset_0_0_24px_rgba(255,255,255,0.4)]': !isDragging && !isUploading,
                'bg-gradient-to-br from-blue-200/30 via-blue-100/40 to-blue-200/25 shadow-[inset_0_2px_18px_rgba(59,130,246,0.2),inset_0_0_32px_rgba(255,255,255,0.5)]': isDragging,
                'bg-gradient-to-br from-slate-100/15 via-slate-50/25 to-slate-100/15 shadow-[inset_0_1px_12px_rgba(0,0,0,0.04)]': isUploading
              }"
            ></div>

            <!-- Subtle Border Accent (replacing dashed border) -->
            <div class="absolute inset-0 border border-transparent rounded-lg" :class="{
              'border-blue-300/25': !isDragging && !isUploading,
              'border-blue-400/40': isDragging,
              'border-slate-200/20': isUploading
            }"></div>

            <!-- Upload Content -->
            <div v-if="!isUploading" class="relative z-10">
              <!-- Icon Container - Glassmorphism Style -->
              <div class="relative flex items-center justify-center w-10 h-10 mx-auto mb-2">
                <!-- Subtle Blue Glow -->
                <div class="absolute inset-0 rounded-md bg-blue-400/15 blur-md"></div>

                <!-- Glassmorphism Container -->
                <div class="relative w-10 h-10 bg-white/90 backdrop-blur-sm rounded-md flex items-center justify-center border border-white/80 shadow-[0_2px_6px_rgba(59,130,246,0.1),0_0_0_1px_rgba(59,130,246,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)]">
                  <!-- Modern Upload Icon -->
                  <svg class="w-5 h-5 text-blue-600 transition-all duration-300" :class="{ 'text-blue-700 scale-105': isDragging }" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 3V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <p class="text-[11px] md:text-xs font-medium text-slate-700 mb-2">Drag & drop files here, or</p>

              <!-- Medium-sized Elegant Button -->
              <button
                @click.stop="triggerFileInput"
                class="relative inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-md text-[11px] font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-[0_3px_10px_rgba(59,130,246,0.25),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_4px_12px_rgba(59,130,246,0.35),0_0_0_1px_rgba(255,255,255,0.15)_inset]"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 2V9H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Select Files
              </button>
            </div>
          </div>

          <!-- Upload Status Section (แสดงเฉพาะตอนกำลังอัปโหลด) -->
          <div v-if="isUploading && uploadingFiles.length > 0" class="mt-3 bg-white/60 backdrop-blur-sm rounded-md p-2.5 border border-slate-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-1.5">
                <svg class="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7V5C3 3.89543 3.89543 3 5 3H9.58579C9.851 3 10.1054 3.10536 10.2929 3.29289L12.7071 5.70711C12.8946 5.89464 13.149 6 13.4142 6H19C20.1046 6 21 6.89543 21 8V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="text-[11px] text-slate-500">
                  Uploading to: <span class="flex gap-3 text-[11px] text-slate-500">{{ currentFolderPath }}</span>
                </p>
              </div>
              <button
                @click="openFolderModal"
                class="text-[11px] text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Change Folder
              </button>
            </div>

            <!-- Uploading Files List -->
            <div class="space-y-1.5 mb-2">
              <div v-for="(file, index) in uploadingFiles" :key="file.id || index" class="p-2 border rounded-md bg-white/80 border-slate-200/60">
                <div class="flex items-center gap-2 mb-1.5">
                  <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-md" :class="file.status === 'completed' ? 'bg-green-50 text-green-600' : getFileIconClass(file.name)">
                    <svg v-if="file.status === 'completed'" class="w-3.5 h-3.5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else-if="getFileIcon(file.name) === 'pdf'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16 13H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M16 17H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      <path d="M10 9H9H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else-if="getFileIcon(file.name) === 'image'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5"/>
                      <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else-if="getFileIcon(file.name) === 'video'" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H14C15.1046 19 16 18.1046 16 17V7C16 5.89543 15.1046 5 14 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[11px] font-medium text-slate-700 truncate mb-0.5">{{ file.name }}</div>
                    <div v-if="file.status === 'uploading'" class="text-[9px] text-slate-500">{{ formatFileSize(file.uploaded || 0) }} / {{ formatFileSize(file.size) }}</div>
                    <div v-else-if="file.status === 'completed'" class="text-[9px] text-green-600 font-medium">Upload completed</div>
                    <div v-else class="text-[9px] text-red-500 font-medium">Upload failed</div>
                  </div>
                  <div v-if="file.status === 'uploading'" class="flex-shrink-0 text-[11px] font-medium text-slate-600">{{ file.progress || 0 }}%</div>
                  <div v-else-if="file.status === 'completed'" class="flex items-center gap-2">
                    <a v-if="getCompletedFileLink(file.name)" :href="getCompletedFileLink(file.name)" target="_blank" class="text-[11px] text-blue-500 hover:text-blue-600 font-medium">Open in Drive</a>
                    <button v-if="getCompletedFileLink(file.name)" @click.stop="copyFileLink(file.name)" class="text-[11px] text-slate-500 hover:text-slate-600 font-medium">Copy Link</button>
                  </div>
                </div>
                <div v-if="file.status === 'uploading'" class="w-full h-0.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    class="h-full transition-all duration-300 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                    :style="{ width: (file.progress || 0) + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Total Progress (แสดงเฉพาะเมื่อมีหลายไฟล์) -->
            <div v-if="uploadingFiles.length > 1" class="bg-slate-50/60 rounded-md p-2.5 border border-slate-200/40 mb-2">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[11px] font-medium text-slate-600">Total progress</span>
                <span class="text-[11px] font-medium text-slate-700">{{ totalProgress }}%</span>
              </div>
              <div class="w-full h-0.5 bg-slate-200/80 rounded-full overflow-hidden">
                <div
                  class="h-full transition-all duration-300 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                  :style="{ width: totalProgress + '%' }"
                ></div>
              </div>
            </div>

            <!-- Clear List Button -->
            <div class="flex justify-end pt-2 border-t border-slate-200/40">
              <button
                @click="clearCompletedFiles"
                class="text-[11px] text-slate-500 hover:text-slate-700 font-medium transition-colors flex items-center gap-1"
                :disabled="completedFilesCount === 0"
              >
                <span class="flex gap-3 text-[11px] text-slate-500" >Clear completed</span>
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Selected Files -->
          <div v-if="selectedFiles.length > 0 && !isUploading" class="mt-3 bg-white/60 backdrop-blur-sm rounded-md p-2.5 border border-slate-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/40">
              <h3 class="text-xs font-semibold text-slate-700">Selected Files</h3>
              <span class="text-[10px] text-slate-500 bg-slate-100/60 px-2 py-0.5 rounded-full font-medium">{{ selectedFiles.length }} {{ selectedFiles.length === 1 ? 'file' : 'files' }}</span>
            </div>
            <div class="flex flex-col gap-1.5 mb-2">
              <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center gap-2 p-2 transition-all duration-200 border rounded-md bg-white/70 border-slate-200/50 hover:border-slate-300/60">
                <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-blue-500 rounded-md bg-blue-50/80">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13 2V9H20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[11px] font-medium text-slate-700 truncate">{{ file.name }}</div>
                  <div class="text-[9px] text-slate-500 mt-0.5">{{ formatFileSize(file.size) }}</div>
                </div>
                <button @click.stop="removeFile(index)" class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-red-500 transition-all duration-200 rounded-md bg-red-50/80 hover:bg-red-100/80" title="Remove file">
                  <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <button @click="uploadFiles" class="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-1.5 px-3 rounded-md text-[11px] font-medium hover:from-blue-600 hover:to-blue-700 hover:shadow-[0_2px_6px_rgba(59,130,246,0.25)] transition-all duration-200 shadow-[0_1px_3px_rgba(59,130,246,0.2)]">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M17 8L12 3L7 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 3V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Upload {{ selectedFiles.length }} {{ selectedFiles.length === 1 ? 'file' : 'files' }}</span>
            </button>
          </div>

          <!-- Uploaded Files -->
          <div v-if="uploadedFiles.length > 0 && !isUploading" class="mt-3 bg-white/60 backdrop-blur-sm rounded-md p-2.5 border border-slate-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/40">
              <h3 class="text-xs font-semibold text-slate-700">Uploaded Files</h3>
              <span class="text-[10px] text-green-600 bg-green-50/60 px-2 py-0.5 rounded-full font-medium">{{ uploadedFiles.length }} {{ uploadedFiles.length === 1 ? 'file' : 'files' }}</span>
            </div>
            <div class="flex flex-col gap-1.5">
              <div v-for="file in uploadedFiles" :key="file.id" class="flex flex-wrap items-center gap-2 p-2 transition-all duration-200 border rounded-md bg-white/70 border-green-200/40 hover:border-green-300/60">
                <div class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-600 rounded-md bg-green-50/80">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[11px] font-medium text-slate-700 truncate">{{ file.name }}</div>
                  <div class="text-[9px] text-slate-500 mt-0.5">{{ formatFileSize(file.size) }}</div>
                </div>
                <a :href="file.webViewLink" target="_blank" class="flex-shrink-0 flex items-center gap-1 bg-white text-slate-600 px-2 py-1 rounded-md text-[10px] font-medium border border-slate-200/60 hover:bg-slate-50/80 hover:border-slate-300/60 transition-all duration-200 sm:w-auto w-full justify-center mt-2 sm:mt-0">
                  <svg class="w-3 h-3" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
                    <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
                    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
                    <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
                    <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
                    <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
                  </svg>
                  <span class="flex gap-3 text-[11px] text-slate-500" >Open in Drive</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="flex items-center justify-center gap-1.5 bg-red-50/60 text-red-600 px-3 py-2 rounded-md mt-3 font-medium border border-red-200/40 text-[11px]">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
              <path d="M12 8V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M12 16H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span class="flex gap-3 text-[11px]" >{{ errorMessage }}</span>
          </div>

          <!-- Footer -->
          <div class="mt-3 pt-2.5 border-t border-slate-200/40 text-center">
            <div class="flex items-center justify-center gap-1 mb-0.5">
              <svg class="w-3.5 h-3.5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
                <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
                <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
                <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
                <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
                <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
              </svg>
              <span class="text-[11px] text-slate-500 font-medium">Powered by Google Drive</span>
            </div>
            <p class="text-[9px] text-slate-400">Files are uploaded securely to your designated Google Drive folder.</p>
          </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Folder Selection Modal -->
    <div v-if="showFolderModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click.self="closeFolderModal">
      <div class="bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] max-w-md w-full p-5 border border-white/60">
        <div class="flex items-center justify-between mb-3.5">
          <h3 class="text-base font-semibold text-slate-800">Select Folder</h3>
          <button @click="closeFolderModal" class="flex items-center justify-center transition-all rounded-lg w-7 h-7 text-slate-400 hover:text-slate-600 hover:bg-slate-100/80">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="mb-4">
          <p class="mb-3 text-sm text-slate-600">Folder selection feature will be implemented here.</p>
          <div class="bg-slate-50/80 rounded-lg p-3.5 border border-slate-200/60">
            <p class="text-sm text-slate-500">Current folder: <span class="font-medium text-slate-700">{{ currentFolderPath }}</span></p>
          </div>
        </div>
        <div class="flex justify-end gap-3">
          <button @click="closeFolderModal" class="px-4 py-2 text-sm font-medium transition-colors text-slate-700 hover:text-slate-900">
            Cancel
          </button>
          <button @click="confirmFolderSelection" class="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import uploadService from '../services/upload.service';
import Navbar from '../components/Navbar.vue';

/**
 * UploadView Component
 * Handles file upload to Google Drive with drag & drop support
 */

// Constants
const ROUTES = {
  LOGIN: '/login',
  PROFILE: '/profile',
  UPLOAD: '/upload'
};

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user'
};

const FILE_LIMITS = {
  MAX_SIZE_MB: 50,
  MAX_SIZE_BYTES: 50 * 1024 * 1024 // 50MB in bytes
};

const FILE_EXTENSIONS = {
  PDF: ['pdf'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
  VIDEO: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm']
};

const FILE_ICON_CLASSES = {
  PDF: 'bg-red-50 text-red-600',
  IMAGE: 'bg-green-50 text-green-600',
  VIDEO: 'bg-blue-50 text-blue-600',
  DEFAULT: 'bg-slate-50 text-slate-600'
};

const UPLOAD_STATUS = {
  UPLOADING: 'uploading',
  COMPLETED: 'completed',
  ERROR: 'error'
};

const CLEAR_FILES_DELAY_MS = 1000; // 1 second

const DEFAULT_FOLDER_PATH = 'My Drive / UpDive / Uploads';

const DEFAULT_USER = {
  NAME: 'User',
  EMAIL: 'user@example.com'
};

export default {
  name: 'UploadView',
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();
    
    // Reactive state
    const fileInput = ref(null);
    const selectedFiles = ref([]);
    const uploadedFiles = ref([]);
    const uploadingFiles = ref([]); // Files currently being uploaded with progress
    const isDragging = ref(false);
    const isUploading = ref(false);
    const uploadProgress = ref(0);
    const errorMessage = ref('');
    const showFolderModal = ref(false);
    const currentFolderPath = ref(DEFAULT_FOLDER_PATH);

    // User info (will be replaced with actual auth data later)
    const userName = ref(DEFAULT_USER.NAME);
    const userEmail = ref(DEFAULT_USER.EMAIL);

    /**
     * Gets file extension from filename
     * @param {string} fileName - Full filename
     * @returns {string} File extension in lowercase
     */
    const getFileExtension = (fileName) => {
      return fileName.split('.').pop()?.toLowerCase() || '';
    };

    /**
     * Validates file size against maximum limit
     * @param {File} file - File to validate
     * @returns {Object} Validation result with isValid flag and error message
     */
    const validateFileSize = (file) => {
      if (file.size > FILE_LIMITS.MAX_SIZE_BYTES) {
        return {
          isValid: false,
          error: `ไฟล์ ${file.name} มีขนาดใหญ่เกิน ${FILE_LIMITS.MAX_SIZE_MB}MB`
        };
      }
      return { isValid: true, error: '' };
    };

    /**
     * Triggers file input click to open file picker
     */
    const triggerFileInput = () => {
      fileInput.value.click();
    };

    /**
     * Handles file selection from file input
     * @param {Event} event - File input change event
     */
    const handleFileSelect = (event) => {
      const files = Array.from(event.target.files);
      addFiles(files);
    };

    /**
     * Handles file drop from drag & drop
     * @param {DragEvent} event - Drag and drop event
     */
    const handleDrop = (event) => {
      isDragging.value = false;
      const files = Array.from(event.dataTransfer.files);
      addFiles(files);
    };

    /**
     * Adds files to selected files list after validation
     * @param {File[]} files - Array of files to add
     */
    const addFiles = (files) => {
      const validFiles = files.filter(file => {
        const validation = validateFileSize(file);
        if (!validation.isValid) {
          errorMessage.value = validation.error;
          return false;
        }
        return true;
      });
      selectedFiles.value = [...selectedFiles.value, ...validFiles];
      errorMessage.value = '';
    };

    /**
     * Removes file from selected files list
     * @param {number} index - Index of file to remove
     */
    const removeFile = (index) => {
      selectedFiles.value.splice(index, 1);
    };

    /**
     * Creates upload item object for tracking upload progress
     * @param {File} file - File to upload
     * @param {number} index - File index
     * @returns {Object} Upload item object
     */
    const createUploadItem = (file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      file: file,
      progress: 0,
      uploaded: 0,
      status: UPLOAD_STATUS.UPLOADING
    });

    /**
     * Updates upload progress for a file
     * @param {Object} uploadItem - Upload item to update
     * @param {number} progress - Progress percentage (0-100)
     */
    const updateUploadProgress = (uploadItem, progress) => {
      uploadItem.progress = progress;
      uploadItem.uploaded = Math.round((uploadItem.size * progress) / 100);
    };

    /**
     * Cleans up completed/error files from uploading list
     */
    const cleanupCompletedFiles = () => {
      setTimeout(() => {
        uploadingFiles.value = uploadingFiles.value.filter(f => f.status === UPLOAD_STATUS.UPLOADING);
        if (uploadingFiles.value.length === 0) {
          isUploading.value = false;
        }
      }, CLEAR_FILES_DELAY_MS);
    };

    /**
     * Resets form after upload completion
     */
    const resetUploadForm = () => {
      selectedFiles.value = [];
      fileInput.value.value = '';
    };

    /**
     * Handles file upload to Google Drive
     * Uploads files one by one to track individual progress
     */
    const uploadFiles = async () => {
      if (selectedFiles.value.length === 0) return;

      isUploading.value = true;
      errorMessage.value = '';

      // Create uploadingFiles array with progress tracking
      uploadingFiles.value = selectedFiles.value.map((file, index) => 
        createUploadItem(file, index)
      );

      try {
        // Upload files one by one to track progress per file
        const results = [];
        for (let i = 0; i < uploadingFiles.value.length; i++) {
          const uploadItem = uploadingFiles.value[i];
          try {
            const result = await uploadService.uploadFile(
              uploadItem.file,
              (progress) => updateUploadProgress(uploadItem, progress)
            );
            uploadItem.status = UPLOAD_STATUS.COMPLETED;
            uploadItem.progress = 100;
            results.push(result.file);
          } catch (error) {
            uploadItem.status = UPLOAD_STATUS.ERROR;
            console.error(`Upload error for ${uploadItem.name}:`, error);
          }
        }

        // Move completed files to uploadedFiles
        uploadedFiles.value.unshift(...results);

        // Clean up completed/error files after delay
        cleanupCompletedFiles();

        resetUploadForm();
      } catch (error) {
        console.error('Upload error:', error);
        errorMessage.value = error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปโหลด';
        isUploading.value = false;
        uploadingFiles.value = [];
      }
    };

    /**
     * Formats file size in bytes to human-readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size (e.g., "1.5 MB")
     */
    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    /**
     * Determines file type based on extension
     * @param {string} fileName - Full filename
     * @returns {string} File type: 'pdf', 'image', 'video', or 'file'
     */
    const getFileIcon = (fileName) => {
      const ext = getFileExtension(fileName);
      
      if (FILE_EXTENSIONS.PDF.includes(ext)) {
        return 'pdf';
      } else if (FILE_EXTENSIONS.IMAGE.includes(ext)) {
        return 'image';
      } else if (FILE_EXTENSIONS.VIDEO.includes(ext)) {
        return 'video';
      }
      return 'file';
    };

    /**
     * Gets CSS classes for file icon based on file type
     * @param {string} fileName - Full filename
     * @returns {string} CSS classes for file icon
     */
    const getFileIconClass = (fileName) => {
      const ext = getFileExtension(fileName);
      
      if (FILE_EXTENSIONS.PDF.includes(ext)) {
        return FILE_ICON_CLASSES.PDF;
      } else if (FILE_EXTENSIONS.IMAGE.includes(ext)) {
        return FILE_ICON_CLASSES.IMAGE;
      } else if (FILE_EXTENSIONS.VIDEO.includes(ext)) {
        return FILE_ICON_CLASSES.VIDEO;
      }
      return FILE_ICON_CLASSES.DEFAULT;
    };

    /**
     * Gets completed file link from uploadedFiles by filename
     * @param {string} fileName - Name of the file
     * @returns {string|null} Google Drive web view link or null
     */
    const getCompletedFileLink = (fileName) => {
      const uploadedFile = uploadedFiles.value.find(f => f.name === fileName);
      return uploadedFile?.webViewLink || null;
    };

    /**
     * Copies file link to clipboard
     * @param {string} fileName - Name of the file to copy link for
     */
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

    /**
     * Clears authentication data and redirects to login
     */
    const handleLogout = () => {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      router.push(ROUTES.LOGIN);
    };

    /**
     * Navigates to profile page
     */
    const handleProfile = () => {
      router.push(ROUTES.PROFILE);
    };

    /**
     * Handles settings button click
     * TODO: Open settings modal or navigate to settings page
     */
    const handleSettings = () => {
      console.log('Settings clicked');
    };

    /**
     * Opens folder selection modal
     */
    const openFolderModal = () => {
      showFolderModal.value = true;
    };

    /**
     * Closes folder selection modal
     */
    const closeFolderModal = () => {
      showFolderModal.value = false;
    };

    /**
     * Confirms folder selection
     * TODO: Implement folder selection logic
     */
    const confirmFolderSelection = () => {
      closeFolderModal();
    };

    /**
     * Clears completed files from both uploadedFiles and uploadingFiles
     */
    const clearCompletedFiles = () => {
      uploadedFiles.value = uploadedFiles.value.filter(file => {
        const uploadingItem = uploadingFiles.value.find(uf => uf.name === file.name);
        return !uploadingItem || uploadingItem.status !== UPLOAD_STATUS.COMPLETED;
      });
      uploadingFiles.value = uploadingFiles.value.filter(f => f.status === UPLOAD_STATUS.UPLOADING);
    };

    /**
     * Computed: Calculates total upload progress percentage
     * @returns {number} Average progress percentage (0-100)
     */
    const totalProgress = computed(() => {
      if (uploadingFiles.value.length === 0) return 0;
      const total = uploadingFiles.value.reduce((sum, file) => sum + (file.progress || 0), 0);
      return Math.round(total / uploadingFiles.value.length);
    });

    /**
     * Computed: Counts completed or error files
     * @returns {number} Number of completed/error files
     */
    const completedFilesCount = computed(() => {
      return uploadingFiles.value.filter(f => 
        f.status === UPLOAD_STATUS.COMPLETED || f.status === UPLOAD_STATUS.ERROR
      ).length;
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
