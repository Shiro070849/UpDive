<template>
  <div class="loader-container">
    <div class="loader-drive">
      <svg viewBox="0 0 87.3 78" class="drive-logo">
        <!-- Yellow section -->
        <path class="yellow-section" d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z"/>
        <!-- Green section -->
        <path class="green-section" d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z"/>
        <!-- Red section -->
        <path class="red-section" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z"/>
        <!-- Dark green section -->
        <path class="dark-green-section" d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z"/>
        <!-- Blue section -->
        <path class="blue-section" d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z"/>
        <!-- Orange/Yellow section -->
        <path class="orange-section" d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CloudLoader'
}
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  overflow: hidden;
}

.loader-drive {
  width: 120px;
  height: 120px;
  animation: drive-animation 4s ease-in-out infinite;
}

.drive-logo {
  width: 100%;
  height: 100%;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}

.yellow-section {
  fill: #0066da;
}

.green-section {
  fill: #00ac47;
}

.red-section {
  fill: #ea4335;
}

.dark-green-section {
  fill: #00832d;
}

.blue-section {
  fill: #2684fc;
}

.orange-section {
  fill: #ffba00;
}

@keyframes drive-animation {
  0%, 10% {
    transform: scale(0.8) translateX(-300px);
    opacity: 0;
  }
  25% {
    transform: scale(0.8) translateX(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1) translateX(0) rotate(360deg);
    opacity: 1;
  }
  75% {
    transform: scale(0.8) translateX(0) rotate(720deg);
    opacity: 1;
  }
  90%, 100% {
    transform: scale(0.8) translateX(300px) rotate(720deg);
    opacity: 0;
  }
}
</style>
