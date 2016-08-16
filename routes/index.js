var express = require('express');
var router = express.Router();
var handler = require('./handler.js');

router.route('/')
.get((req, res) => {
  res.send('Hello World');
});

router.route('/items')
.get(handler.get);

module.exports = function( app ) {
  app.use(router);
  return app;
};