const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  // Send the register.html file when a GET request is made to the root URL
  res.sendFile(path.join(__dirname, 'static', 'register.html'));
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
