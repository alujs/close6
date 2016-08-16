var sql = require('../data.js');
var opts = {};

opts.get = function( req, res ) {
  res.send(sql.get());
};

module.exports = opts;