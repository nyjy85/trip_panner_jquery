var express = require('express')
var swig = require('swig')
var nodeSass = require('node-sass-middleware')
var logger = require('morgan')
var days = require('./routes/days');
var bodyParser = require('body-parser');

var app = express()
var path = require('path')
module.exports = app

app.use(logger('dev'))

var sassMiddleware = nodeSass({
  src: __dirname + '/assets',
  dest: __dirname + '/public',
  debug: true
});
app.use(sassMiddleware);



// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

//todo 
/*
  - view engine [check]
  - bower components [check]
  - sass middleware [check]
  - logger [check]
  - mongoose model [check]
  - routes 
  - a ton of css
*/
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.all('/*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
//   next();
// });

app.use(require('./routes'))
app.use('/days', days);








app.listen(process.env.PORT || 3000, function() {
  console.log('server up')
})