var express = require('express');
var mongoose = require('mongoose');
var path =  require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;
var app = express();
var db = mongoose.connection;


// var dbUrl = 'mongodb://localhost/imooc';

mongoose.connect('mongodb://localhost/imooc');

db.once('open', function(callback){
	console.log('succesfully.');
});

app.locals.moment = require('moment');

app.set('views', './app/views/pages');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use(cookieParser());
app.use(session({
  secret: 'imooc',
  store: new mongoStore({
    url: 'mongodb://localhost/imooc',
    collection: 'sessions'
  })
}));

app.use(function(req, res, next){
		var _user = req.session.user;
		if(_user)
		{
				res.locals.user = _user;
		}

		return next();
});

//输出相关iam的调试信息
if ('development' === app.get('env')) {
		app.set('showStackError', true);
		// app.use(express.logger(':method :url :status'));
		// app.use(morgan('combined', {stream: accessLogStream}));
		app.use(morgan('combined :method :url :status'));
		app.locals.pretty = true;
		mongoose.set('debug', true);
}
require('./config/routes')(app);
app.listen(port);
console.log('imooc started on port ' + port);