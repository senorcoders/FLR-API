'use strict';
module.exports = function(app) {
  var comments_operator = require('../controllers/commentsOperatorController');
  const endpoint = '/api/comments-operator';

  // User Routes
  app.route(endpoint)
  .put(comments_operator.getAll)
    .post(comments_operator.save)

    app.route(endpoint+ "/:id/delete")
    .post(comments_operator.delete)

    app.route(endpoint+ "/update")
    .post(comments_operator.update)

};
