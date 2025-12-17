/**
 * Example Controller
 * This is a sample controller - replace with your actual controllers
 */

const exampleController = {
  // GET /api/example/hello
  getHello: async (req, res) => {
    try {
      res.json({
        success: true,
        message: "Hello World from Controller!",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = exampleController;
