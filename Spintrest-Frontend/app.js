const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'HTML/index.html'));
});

app.get('/style.css', function(req, res) {
   res.sendFile(__dirname + "/CSS/style.css");
 });

app.listen(port);
console.log('Server started at http://localhost:' + port)