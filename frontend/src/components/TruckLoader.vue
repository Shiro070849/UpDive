<template>
  <div class="w-full flex justify-center items-center mb-6">
    <div class="w-[200px] h-[100px] flex flex-col relative items-center justify-end overflow-x-hidden">
      <!-- Truck Body -->
      <div class="w-[130px] h-fit mb-1.5 animate-bounce-truck">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" class="w-full h-auto">
          <!-- Cab -->
          <path stroke-width="3" stroke="#282828" fill="#4285f4" d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"></path>
          <!-- Window -->
          <path stroke-width="3" stroke="#282828" fill="#7D7C7C" d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"></path>
          <!-- Steering wheel -->
          <path stroke-width="2" stroke="#282828" fill="#282828" d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"></path>
          <!-- Headlight -->
          <rect stroke-width="2" stroke="#282828" fill="#fbbc05" rx="1" height="7" width="5" y="63" x="187"></rect>
          <!-- Cargo -->
          <rect stroke-width="3" stroke="#282828" fill="#FFFFFF" rx="2.5" height="90" width="121" y="1.5" x="6.5"></rect>
          <!-- Bumper -->
          <rect stroke-width="2" stroke="#282828" fill="#DFDFDF" rx="2" height="4" width="6" y="84" x="1"></rect>
          <!-- Google Drive Logo -->
          <g transform="translate(45, 25) scale(0.5)">
            <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066da"/>
            <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3L1.2 52.35c-.8 1.4-1.2 2.95-1.2 4.5h27.5l16.15-31.85z" fill="#00ac47"/>
            <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.85L73.55 76.8z" fill="#ea4335"/>
            <path d="M43.65 25L57.4 1.2c-1.35-.8-2.9-1.2-4.5-1.2H34.35c-1.6 0-3.15.45-4.45 1.2L43.65 25z" fill="#00832d"/>
            <path d="M59.85 53H27.5l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L59.85 53z" fill="#2684fc"/>
            <path d="M73.4 26.5l-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.2 28h27.45c0-1.55-.4-3.1-1.2-4.5l-12.7-22z" fill="#ffba00"/>
          </g>
        </svg>
      </div>
      <!-- Tires -->
      <div class="w-[130px] h-fit flex items-center justify-between px-2.5 absolute bottom-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" class="w-6 h-6 animate-spin-tire">
          <circle stroke-width="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
          <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" class="w-6 h-6 animate-spin-tire">
          <circle stroke-width="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
          <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
        </svg>
      </div>
      <!-- Road -->
      <div class="road w-full h-[1.5px] bg-slate-400 relative self-end rounded"></div>
      <!-- Lamp Post -->
      <svg xml:space="preserve" viewBox="0 0 453.459 453.459" xmlns="http://www.w3.org/2000/svg" class="lamp-post absolute bottom-0 h-[90px]">
        <path d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017h78.747C231.693,100.736,232.77,106.162,232.77,111.694z" fill="#94a3b8"></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TruckLoader'
}
</script>

<style scoped>
@keyframes bounce-truck {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(2px); }
}

@keyframes spin-tire {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes road-move {
  from { transform: translateX(0); }
  to { transform: translateX(-100px); }
}

.animate-bounce-truck {
  animation: bounce-truck 0.5s ease-in-out infinite;
}

.animate-spin-tire {
  animation: spin-tire 0.5s linear infinite;
}

.road::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 100%;
  background-color: #f8fafc;
  right: 0;
  animation: road-move 1s linear infinite;
}

.road::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 100%;
  background-color: #f8fafc;
  right: 50px;
  animation: road-move 1s linear infinite;
}

@keyframes lamp-pass {
  from { right: -30%; }
  to { right: 130%; }
}

.lamp-post {
  animation: lamp-pass 2s linear infinite;
}
</style>
