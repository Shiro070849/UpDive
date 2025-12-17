/**
 * Example Routes
 * This is a sample route file - replace with your actual routes
 */

const exampleController = require('../controllers/example.controller');

module.exports = (app) => {
  // Example route: GET /api/example/hello
  app.get('/api/example/hello', exampleController.getHello);

  // You can add more routes here
  // app.post('/api/example/create', exampleController.create);
  // app.put('/api/example/update/:id', exampleController.update);
  // app.delete('/api/example/delete/:id', exampleController.delete);
};
