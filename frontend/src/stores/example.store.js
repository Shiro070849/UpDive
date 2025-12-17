/**
 * Example Store (Pinia)
 * This is a sample store - replace with your actual stores
 */

import { defineStore } from 'pinia'

export const useExampleStore = defineStore('example', {
  state: () => ({
    message: 'Hello from Pinia Store!',
    counter: 0,
    items: []
  }),

  getters: {
    doubleCount: (state) => state.counter * 2,
    itemCount: (state) => state.items.length
  },

  actions: {
    increment() {
      this.counter++
    },

    updateMessage(newMessage) {
      this.message = newMessage
    },

    addItem(item) {
      this.items.push(item)
    },

    reset() {
      this.counter = 0
      this.items = []
    }
  }
})
