/**
 * Example Composable
 * This is a sample composable - replace with your actual composables
 */

import { ref } from 'vue'

export function useExample() {
  const message = ref('Hello from Composable!')
  const count = ref(0)

  const increment = () => {
    count.value++
  }

  const updateMessage = (newMessage) => {
    message.value = newMessage
  }

  return {
    message,
    count,
    increment,
    updateMessage
  }
}
