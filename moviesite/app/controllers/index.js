var Movie = require('../models/movie');

exports.index = function(req, res){
		var aa = req.session.user;
		console.log('test: ')
		console.log(aa);

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
};