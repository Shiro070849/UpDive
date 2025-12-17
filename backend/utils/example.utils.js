/**
 * Example Utility Functions
 * This is a sample utility file - replace with your actual utilities
 */

const exampleUtils = {
  // Format date to readable string
  formatDate: (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Generate random ID
  generateId: () => {
    return Math.random().toString(36).substring(2, 9);
  }
};

module.exports = exampleUtils;
