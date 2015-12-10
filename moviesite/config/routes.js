var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');


module.exports = function(app)
{
		//index 
		app.get('/',  Index.index);

		// user
		app.post('/user/signup', User.signup);
		app.post('/user/signin', User.signin);
		app.get('/signin', User.showSignin);
		app.get('/signup', User.showSignup);
		app.get('/logout', User.logout);
		app.get('/admin/userlist', User.signinRequested, User.adminRequested, User.list);
		
		//Movie
		app.post('/admin/movie/new', Movie.new);
		app.get('/admin/movie', User.signinRequested, User.adminRequested, Movie.save);
		app.get('/admin/update/:id', Movie.update);
		app.get('/admin/list', User.signinRequested, User.adminRequested, Movie.list);
		app.get('/movie/:id', Movie.detail);
		app.delete('/admin/list', Movie.del);

		//user comment
		app.post('/user/comment', User.signinRequested, Comment.save);
};