 var mongoose = require('mongoose');
 var Comment = require('../models/comment');

 //Comment
 exports.save = function(req, res)
 {
 		var _comment = req.body.comment;
 		var movieId = _comment.movie;
 		//实例化一个comment对象，将页面提交的数据保存到数据库
 		
 		var comment = new Comment(_comment);

 		comment.save(function(err, comment){
 				if(err)
 				{
 						console.log(err);
 				}
 				res.redirect('/movie/' + movieId);
 		});
 };