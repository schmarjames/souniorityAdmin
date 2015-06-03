var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var User = mongoose.model('User', {
  name: String,
  password: String
});

app.post('/register', function(req, res) {
  var user = req.body;

  var newUser = new User({
    name: user.name,
    password: user.password
  });

  newUser.save(function(err) {
    res.status(200).json(newUser);
  });
});

mongoose.connect('mongodb://loydloyd:4645@ds043012.mongolab.com:43012/vendoradmin');
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('api listening on ', server.address().port);
})
