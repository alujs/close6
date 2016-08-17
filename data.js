var _ = require('lodash');
var query = {};

function ISODate( date_str ) {
  return new Date(date_str).getTime();
}

function distance(lat1, lon1, lat2, lon2) { // http://www.geodatasource.com/developers/javascript
  var radlat1 = Math.PI * lat1/180;
  var radlat2 = Math.PI * lat2/180;
  var theta = lon1-lon2;
  var radtheta = Math.PI * theta/180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
}


query.sort = ( type, direction = 'asc', collection ) => {
  if(direction === 'asc') {
    return collection.sort((a,b) => {
      return a[type] - b[type];
    });
  }

  return collection.sort((a,b) => {
    return b[type] - a[type];
  });
  
};

query.findById = ( type, id, collection ) => {
  return collection.filter((item) => item[type] === id);
};

query.findByLocation = ( currentLocation, radius = 50, collection ) => {
  return collection.filter((item) => {
    let latitude = item.loc[0]; // y
    let longitude = item.loc[1]; // x

    return  distance(latitude, longitude, currentLocation[0], currentLocation[1]) <= radius;
  });
};

module.exports.select = ( params ) => {
  var results = _.reduce(params,(accumulator, value, key)=>{
    if(key === 'createdAt' || key === 'price') {
      return query.sort(key, value, accumulator);
    }

    if(key === 'id' || key === 'userId') {
      return query.findById(key, value, accumulator);
    }

    if(key === 'location') {
      return query.findByLocation(value, 50, accumulator);
    }
  },data);

  return Promise.resolve(results);
};


/* dummy data below */
var data = [{
    "id" : "53fb8f26456e74467b000001",
    "loc" : [ 
        36.1665407118837763, 
        -115.1408087193642729
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : -1,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-25T19:31:50.180Z")
},
{
    "id" : "53fb8f81456e74467b000002",
    "loc" : [ 
        36.1632776369483580, 
        -115.1409809579232757
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : "Cup",
    "price" : 20,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-25T19:33:21.153Z")
},
{
    "id" : "53fbb9b6456e74467b000004",
    "loc" : [ 
        36.1685268205825778, 
        -115.1428359463777298
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : -1,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-25T22:33:26.282Z")
},
{
    "id" : "53fbe21c456e74467b000006",
    "loc" : [ 
        36.1551724788769704, 
        -115.1448416183734196
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : 20,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-26T01:25:48.754Z")
},
{
    "id" : "53fcc82a45b6f4db35000001",
    "loc" : [ 
        36.1685723269377419, 
        -115.1440166218116872
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : -1,
    "status" : "tos",
    "createdAt" : ISODate("2014-08-26T17:47:22.885Z")
},
{
    "id" : "53fccf9945b6f4db3500000a",
    "loc" : [ 
        36.1644731140710007, 
        -115.1408957812771092
    ],
    "userId" : "53fccf7545b6f4db35000007",
    "description" : "BBQ",
    "price" : 0,
    "status" : "tos",
    "createdAt" : ISODate("2014-08-26T18:19:05.321Z")
},
{
    "id" : "53fcf20e646d8f233e000006",
    "loc" : [ 
        36.1662231510807786, 
        -115.1420746777390178
    ],
    "userId" : "53fccf7545b6f4db35000007",
    "description" : "How do we get on this?",
    "price" : 0,
    "status" : "tos",
    "createdAt" : ISODate("2014-08-26T20:46:06.044Z")
},
{
    "id" : "53fd1182646d8f233e000014",
    "loc" : [ 
        36.1644216946368360, 
        -115.1395054988068409
    ],
    "userId" : "53f6c9c96d1944af0b00000b",
    "description" : null,
    "price" : -1,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-26T23:00:18.800Z")
},
{
    "id" : "53fd1e48646d8f233e00001b",
    "loc" : [ 
        36.1655752469648633, 
        -115.1420697964913131
    ],
    "userId" : "53fd1d5f646d8f233e000015",
    "description" : "Markers NOT previously chomped on.",
    "price" : -1,
    "status" : "removed",
    "createdAt" : ISODate("2014-08-26T23:54:48.754Z")
}];