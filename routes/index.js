var express = require('express');
var router = express.Router();
var handler = require('./handler.js');

router.route('/')
.get(handler.home);

router.route('/items')
.get(handler.get);

module.exports = ( app ) => {
  app.use(router);
  return app;
};