<template>
  <div class="hello-world">
    <h2>{{ message }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'Hello World!',
      description: 'This is an example component - replace with your own components'
    }
  }
}
</script>

<style scoped>
.hello-world {
  padding: 2rem;
  text-align: center;
}

h2 {
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  color: var(--text-color);
  opacity: 0.8;
}
</style>
