const port = 8080;

const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use('/', 
  express.static(
    path.join(
      	path.join(__dirname, '..'), '..')));

app.use('/js',
  express.static(
    path.join(
      	path.join(__dirname, '..'), 'client')));

app.get('/', (req, res) => {
	res.sendFile('index.html');
});

app.listen(port, () => {
	console.log(`Listening on ${port} port`);
});
