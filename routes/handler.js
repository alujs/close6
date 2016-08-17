var sql = require('../data.js');
var _ = require('lodash');
var options = {};

function validateLoc ( queryObj ) {
  var splitLoc = queryObj.location.split(',');
  
  if(splitLoc.length !== 2) {
    delete queryObj.location;
    return;
  }

  var latitude = parseFloat(splitLoc[0]);
  var longitude = parseFloat(splitLoc[1]);

  if(isNaN(latitude)|| isNaN(longitude)) {
    delete queryObj.location;
    return;
  }

  queryObj.location = [latitude, longitude];

  return queryObj;
}

options.get = ( req, res ) => {
  var query = _.cloneDeep(req.query);

  if(query.location) {
    validateLoc(query);
  }

  return sql.select(query)
  .then((results) => {
    res.send(results);
  });
};

options.home = ( req, res ) => {
  res.send(`
    <p> Make a get request to localhost:8080/items? </p>
    <p> Valid query strings are the following: </p>
    <ul> price=asc || desc  Defaults to ascending.</ul>
    <ul> createdAt=asc || desc Defaults to ascending.</ul>
    <ul> id=id </ul>
    <ul> userId=id </ul>
    <ul> location=latitude,longitude </ul>
    <p> Queries can be combined. Assumes mostly valid inputs. Errors will yield [] or not be processed.</p>
    <p> Example: http://localhost:8080/items?price=desc&createdAt=asc&userId=53f6c9c96d1944af0b00000b&location=36.164421694636836,-115.13950549880684</p>
  `);
};

module.exports = options;