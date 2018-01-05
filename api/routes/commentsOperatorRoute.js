'use strict';
module.exports = function(app) {
  var comments_operator = require('../controllers/commentsOperatorController');
  const endpoint = '/api/comments-operator';

  // User Routes
  app.route(endpoint)
  .get(comments_operator.getAll)
    .post(comments_operator.save)

    app.route(endpoint+ "/:id")
    .get(comments_operator.getOne)
    .delete(comments_operator.delete)
    .put(comments_operator.update)

};
