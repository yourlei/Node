var User = require('../models/user');

// signup
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册页面'
  });
};

exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录页面'
  });
};
// singup page
exports.signup = function(req, res){
		
		// 拿到提交页中的user对象，并将user对象实例化为User模型
		var _user = req.body.user;
		User.findOne({name: _user.name}, function(err, user){
				if(err)
				{
					  console.log(err);
				}
				
				if(user)
				{
						// 用户已存在

						return res.redirect('/');
				}
				else
				{
						// 用户不存在
						var user= new User(_user);
						
						// console.log(user);
						user.save(function(err, user){
							if(err)
							{
								console.log(err);
							}
						});
						 
						res.redirect('/admin/userlist');
				}
		})
};

//userlist page
exports.list =  function(req, res){
		User.fetch(function(err, users){
		if(err)
		{
			console.log(err);
		}
		res.render('userlist', {
			'title': '用户列表页',
			users: users
		});
	});
};

// signin
 exports.signin =  function(req, res){
		var _user = req.body.user;
		var name = _user.name;
		var password = _user.password;
		// console.log(_user);
		User.findOne({name: name}, function(err, user){
				if(err)
				{
					console.log(err);
				}

				if(!user)
				{
					return res.redirect('/');
				}
			  
			  user.comparePassword(password, function(err, isMatch){
			  	if(err)
			  	{
			  		console.log(err);
			  	}
			  	// console.log("1222222222");
			  	if(isMatch)
			  	{
			  		// console.log('password is matched');
			  		req.session.user = user;	//用户信息写入内存
			  		return res.redirect('/');
			  	}
			  	else
			  	{
			  		console.log('password is not matched');
			  	}
			  });
		});
	 
};

// logout
exports.logout = function(req, res){
	delete req.session.user;

	return res.redirect('/');
};
// middleware  for user
exports.signinRequested =  function(req, res, next){
		var user = req.session.user;

		if (!user) 
		{
			return res.redirect('/signin');
		}
		next();
};
exports.adminRequested =  function(req, res, next){
		var user = req.session.user;

		if(user.role <= 10)
		{
				return res.redirect('/signin');
		}
		next();
};
