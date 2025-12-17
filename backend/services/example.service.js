/**
 * Example Service
 * This is a sample service - replace with your actual services
 */

const exampleService = {
  getMessage: () => {
    return "Hello World from Service!";
  },

  getWelcomeData: () => {
    return {
      title: "Welcome to Your New Project",
      description: "This is an example service response",
      version: "1.0.0"
    };
  }
};

module.exports = exampleService;
