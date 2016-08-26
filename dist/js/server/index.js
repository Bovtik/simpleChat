'use strict';

var port = 8080;

var fs = require('fs');
var path = require('path');

var express = require('express');
var app = express();

app.use('/', express.static(path.join(path.join(__dirname, '..'), '..')));

app.use('/js', express.static(path.join(path.join(__dirname, '..'), 'client')));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.listen(port, function () {
  console.log('Listening on ' + port + ' port');
});