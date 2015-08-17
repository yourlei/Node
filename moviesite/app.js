var express = require('express');
var mongoose = require('mongoose');
var path =  require('path');
var Movie = require('./models/movie');
var _ = require('underscore');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/imooc');
db.once('open', function(callback){
	console.log('succesfully.');
});

app.locals.moment = require('moment');

app.set('views', './views/pages');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
app.use(express.static(path.join(__dirname,'public')));


//index page
app.get('/', function(req, res){
	Movie.fetch(function(err, movies){
		if(err)
		{
			console.log(err);
		}
		res.render('index', {
			title:'首页',
			movies: movies
		});
	});
});

//admin post movie
app.post('/admin/movie/new', function(req, res){
	
	console.log(req.body.movie);

	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	 
	if(id !== 'undefined')
	{
		// console.log(id);
		Movie.findById(id, function(err, movie){
			if(err)
			{
				console.log(err);
			}

			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie){
				if(err)
				{
					console.log(err);
				}
				res.redirect('/movie/' + movie._id);
			});
		})
	}
	else
	{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		});

		_movie.save(function(err, movie){
			if(err)
			{
				console.log(err);
			}
			res.redirect('/movie/' + movie._id);
		});
	}

});
//admin page
app.get('/admin/movie', function(req, res){
	res.render('admin', {
		'title': 'imooc 后台页',
		movie:{
			doctor:'',
			country:'',
			title:'',
			year:'',
			poster:'',
			language:'',
			flash:'',
			summary:''
		}
	});
});

//admin update movie
app.get('/admin/update/:id', function(req, res){
	var id = req.params.id;

	if(id)
	{
		Movie.findById(id, function(err, movie){
			res.render('admin', {
				title: 'imooc 后台更新页',
				movie: movie
			});
		});
	}
});

//list page
app.get('/admin/list', function(req, res){
	Movie.fetch(function(err, movies){
		if(err)
		{
			console.log(err);
		}
		res.render('list', {
			'title': 'imooc 列表页',
			movies: movies
		});
	});
});

//detail page
app.get('/movie/:id', function(req, res){
	var id = req.params.id;

	Movie.findById(id, function(err, movie){
		res.render('detail', {
			'title': 'imooc' + movie.title,
			movie: movie
		});
	});
});

//delete list
app.delete('/admin/list', function(req, res){
	var id = req.query.id;

	if(id)
	{
		Movie.remove({_id: id}, function(err, movie){
			if(err)
			{
				console.log(err);
			}
			else
			{
				res.json({success: 1});
			}
		});
	}
});

app.listen(port);
console.log('imooc started on port ' + port);
