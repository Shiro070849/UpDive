<template>
  <div class="home">
    <div class="container">
      <h1>Welcome to Your New Project</h1>
      <p>Start building your application here!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  text-align: center;
  color: white;
  padding: 2rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

p {
  font-size: 1.5rem;
  opacity: 0.9;
}
</style>
