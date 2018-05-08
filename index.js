'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var thunkify = require('thunkify');
var request = require('request');
var cors = require('cors');
var fs = require('fs');
var jade = require('jade');
var provider = require('./main');
var constants = require('./constants');

/****

 APP SETUP

****/

var app = express();
var router = express.Router();
app.use(cors());

app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  limit: '50mb',
  extended: true
}));

var favicon = new Buffer('AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD8HwAA++8AAPf3AADv+wAA7/sAAP//AAD//wAA+98AAP//AAD//wAA//8AAP//AAD//wAA', 'base64');
 app.get("/favicon.ico", function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Length', favicon.length);
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader("Cache-Control", "public, max-age=2592000");                // expiers after a month
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  res.send('ok');
 });

app.set('json spaces', 40);
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use('/public', express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var port = process.env.PORT || 9000;

var server = app.listen(port, function() {
  console.log('RUNNING IN', port);
});

var post = thunkify(request.post);
var get = thunkify(request.get);

/****

ROUTERS

****/

var mainRoutes = require('./routes/main-routes');
var apiRoutes = require('./routes/api');
app.use('/', mainRoutes);
app.use('/api', apiRoutes);
