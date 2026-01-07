<template>
  <div v-if="isAuthorized" class="chatbot-container">
    <!-- Chat Window -->
    <transition name="chat-slide">
      <div v-if="isOpen" class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="header-content">
            <div class="ai-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
              </svg>
            </div>
            <div>
              <div class="chat-title">AI Support</div>
              <div class="chat-status">{{ isTyping ? 'กำลังพิมพ์...' : 'ออนไลน์' }}</div>
            </div>
          </div>
          <div class="header-actions">
            <button @click="clearHistory" class="header-btn" title="ลบประวัติการสนทนา">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            <button @click="closeChat" class="header-btn" title="ปิด">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div class="chat-messages" ref="messagesContainer">
          <div v-if="messages.length === 0" class="welcome-message">
            <div class="welcome-icon">👋</div>
            <h3>สวัสดีครับ!</h3>
            <p>ยินดีต้อนรับสู่ระบบ AI Support</p>
            <p>มีอะไรให้ช่วยไหมครับ?</p>
          </div>

          <div v-for="(msg, index) in messages" :key="index" class="message" :class="msg.role">
            <div class="message-avatar" v-if="msg.role === 'assistant'">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
              </svg>
            </div>
            <div class="message-content">
              <div class="message-text" v-html="formatMessage(msg.content)"></div>
              <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="message assistant typing-indicator">
            <div class="message-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
              </svg>
            </div>
            <div class="message-content">
              <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input-container">
          <form @submit.prevent="sendMessage" class="chat-input-form">
            <input
              v-model="inputMessage"
              type="text"
              placeholder="พิมพ์ข้อความ..."
              class="chat-input"
              :disabled="isTyping"
            />
            <button type="submit" class="send-btn" :disabled="!inputMessage.trim() || isTyping">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Floating Button -->
    <button @click="toggleChat" class="chat-toggle-btn" :class="{ 'chat-open': isOpen }">
      <transition name="icon-fade" mode="out-in">
        <svg v-if="!isOpen" key="chat" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg v-else key="close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </transition>
      <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
    </button>
  </div>
</template>

<script>
import { ref, nextTick, onMounted, watch, computed } from 'vue';
import axios from 'axios';

export default {
  name: 'ChatBot',
  setup() {
    const isOpen = ref(false);
    const inputMessage = ref('');
    const messages = ref([]);
    const isTyping = ref(false);
    const messagesContainer = ref(null);
    const unreadCount = ref(0);

    // Check if user is authorized to use chatbot
    const isAuthorized = computed(() => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.username === 'sysadmin';
    });

    // Load messages from localStorage on mount
    onMounted(() => {
      const savedMessages = localStorage.getItem('chatbot_messages');
      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages);
          // Convert timestamp strings back to Date objects
          messages.value = parsed.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
        } catch (error) {
          console.error('Failed to load chat history:', error);
        }
      }
    });

    // Save messages to localStorage whenever they change
    watch(messages, (newMessages) => {
      localStorage.setItem('chatbot_messages', JSON.stringify(newMessages));
    }, { deep: true });

    const toggleChat = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) {
        unreadCount.value = 0;
        scrollToBottom();
      }
    };

    const closeChat = () => {
      isOpen.value = false;
    };

    const clearHistory = () => {
      if (confirm('ต้องการลบประวัติการสนทนาทั้งหมดหรือไม่?')) {
        messages.value = [];
        localStorage.removeItem('chatbot_messages');
      }
    };

    const scrollToBottom = async () => {
      await nextTick();
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };

    const sendMessage = async () => {
      if (!inputMessage.value.trim() || isTyping.value) return;

      const userMessage = {
        role: 'user',
        content: inputMessage.value,
        timestamp: new Date()
      };

      messages.value.push(userMessage);
      const messageText = inputMessage.value;
      inputMessage.value = '';

      await scrollToBottom();
      isTyping.value = true;

      try {
        // Prepare conversation history for context (limit to last 5 messages)
        const conversationHistory = messages.value
          .slice(-5) // Send last 5 messages for context (reduced from 10)
          .map(msg => ({
            role: msg.role,
            content: msg.content
          }));

        const response = await axios.post('http://localhost:8088/api/chat', {
          message: messageText,
          conversationHistory: conversationHistory.slice(0, -1) // Exclude the last message (current one)
        });

        if (response.data.success) {
          const aiMessage = {
            role: 'assistant',
            content: response.data.response,
            timestamp: new Date()
          };

          messages.value.push(aiMessage);

          if (!isOpen.value) {
            unreadCount.value++;
          }

          await scrollToBottom();
        }
      } catch (error) {
        console.error('Chat error:', error);
        const errorMessage = {
          role: 'assistant',
          content: 'ขอโทษครับ เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
          timestamp: new Date()
        };
        messages.value.push(errorMessage);
        await scrollToBottom();
      } finally {
        isTyping.value = false;
      }
    };

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    };

    const formatMessage = (content) => {
      if (!content) return '';

      let formatted = content;

      // Convert line breaks to <br>
      formatted = formatted.replace(/\n/g, '<br>');

      // Convert numbered lists (1. 2. 3.)
      formatted = formatted.replace(/^(\d+)\.\s+(.+)$/gm, '<div class="list-item"><span class="list-number">$1.</span> $2</div>');

      // Convert bullet points (- or • or *)
      formatted = formatted.replace(/^[-•*]\s+(.+)$/gm, '<div class="list-item"><span class="bullet">•</span> $1</div>');

      // Convert **bold** to <strong>
      formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

      // Convert *italic* to <em>
      formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');

      // Convert `code` to <code>
      formatted = formatted.replace(/`(.+?)`/g, '<code>$1</code>');

      // Convert URLs to clickable links
      formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

      return formatted;
    };

    return {
      isOpen,
      inputMessage,
      messages,
      isTyping,
      messagesContainer,
      unreadCount,
      isAuthorized,
      toggleChat,
      closeChat,
      clearHistory,
      sendMessage,
      formatTime,
      formatMessage
    };
  }
};
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

/* Chat Toggle Button */
.chat-toggle-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5B9BD5 0%, #4A8BC2 100%);
  border: none;
  box-shadow: 0 4px 20px rgba(91, 155, 213, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  position: relative;
}

.chat-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(91, 155, 213, 0.5);
}

.chat-toggle-btn.chat-open {
  background: linear-gradient(135deg, #4A8BC2 0%, #3A7BB2 100%);
}

.unread-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  border: 2px solid white;
}

/* Chat Window */
.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 340px;
  height: 480px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Chat Header */
.chat-header {
  background: linear-gradient(135deg, #5B9BD5 0%, #4A8BC2 100%);
  color: white;
  padding: 0.875rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ai-icon {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-icon svg {
  width: 18px;
  height: 18px;
}

.chat-title {
  font-weight: 600;
  font-size: 0.875rem;
}

.chat-status {
  font-size: 0.6875rem;
  opacity: 0.9;
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.header-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #f8f9fa;
}

.welcome-message {
  text-align: center;
  padding: 1.5rem 1rem;
  color: #5A5A5A;
}

.welcome-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.welcome-message h3 {
  font-size: 1rem;
  margin-bottom: 0.375rem;
  color: #5B9BD5;
}

.welcome-message p {
  margin: 0.125rem 0;
  font-size: 0.8125rem;
  color: #78858F;
}

.message {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #5B9BD5 0%, #4A8BC2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.message-avatar svg {
  width: 16px;
  height: 16px;
}

.message-content {
  max-width: 75%;
}

.message-text {
  background: white;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 0.8125rem;
}

/* Message formatting styles */
.message-text :deep(strong) {
  font-weight: 600;
  color: #2c3e50;
}

.message-text :deep(em) {
  font-style: italic;
  color: #5B9BD5;
}

.message-text :deep(code) {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #e83e8c;
}

.message-text :deep(.list-item) {
  margin: 0.5rem 0;
  padding-left: 0.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.message-text :deep(.list-number) {
  color: #5B9BD5;
  font-weight: 600;
  flex-shrink: 0;
}

.message-text :deep(.bullet) {
  color: #5B9BD5;
  font-weight: bold;
  flex-shrink: 0;
}

.message-text :deep(a) {
  color: #5B9BD5;
  text-decoration: underline;
}

.message-text :deep(a:hover) {
  color: #4A8BC2;
}

.message.user .message-text {
  background: linear-gradient(135deg, #5B9BD5 0%, #4A8BC2 100%);
  color: white;
  border-radius: 12px 12px 0 12px;
}

.message.assistant .message-text {
  border-radius: 12px 12px 12px 0;
}

.message-time {
  font-size: 0.625rem;
  color: #999;
  margin-top: 0.125rem;
  padding: 0 0.375rem;
}

/* Typing Indicator */
.typing-dots {
  display: flex;
  gap: 3px;
  padding: 0.5rem 0.75rem;
  background: white;
  border-radius: 10px 10px 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: #5B9BD5;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

/* Input */
.chat-input-container {
  padding: 0.75rem;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.chat-input-form {
  display: flex;
  gap: 0.375rem;
}

.chat-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  font-size: 0.8125rem;
  transition: border-color 0.2s;
}

.chat-input:focus {
  outline: none;
  border-color: #5B9BD5;
}

.chat-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #5B9BD5 0%, #4A8BC2 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-btn svg {
  width: 18px;
  height: 18px;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(91, 155, 213, 0.3);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Animations */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: opacity 0.2s;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
}

/* Scrollbar */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #5B9BD5;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #4A8BC2;
}

/* Responsive */
@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 2rem);
    height: calc(100vh - 140px);
    bottom: 80px;
    right: 1rem;
  }

  .chatbot-container {
    right: 1rem;
  }
}
</style>
