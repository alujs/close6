var express = require('express');
var app = express();
var router = express.Router();

require('./routes')(app);

app.listen(8080);