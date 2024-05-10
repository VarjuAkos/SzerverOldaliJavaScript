const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: 'secret'
}));

require('./route/index.js')(app);

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
