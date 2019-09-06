// A simple server that hosts REACT App created after build.
// React App is converted into simple .html , .css & .js files
// Then these files can be easily hosted on any web server
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
