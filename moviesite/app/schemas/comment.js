/* var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var ObjectId = Schema.Type.ObjectId;*/

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var ObjectId = Schema.Types.ObjectId;

 var CommentSchema = new mongoose.Schema({
  movie:{
  	type: ObjectId,
  	ref: 'Movie'
  },
  from:{
  	type: ObjectId,
  	ref: 'User'
  },
  tu:{
  	type: ObjectId,
  	ref: 'User'
  },
  content: String,
 	meta:{
 		createAt:{
 			type: Date,
 			default: Date.now()
 		},
 		updateAt:{
 			type: Date,
 			default: Date.now()
 		}
 	}
 });
//save time recorde
CommentSchema.pre('save', function(next){
	if(this.isNew)
	{
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else
	{
		this.meta.updateAt = Date.now();
	}
	next();
});
//add static method
CommentSchema.statics  = {
	//get all data
	fetch: function(cb){
		return this.find({})
				   .sort('meta.updateAt')
				   .exec(cb);
	},
	//search record
	findById: function(id, cb){
		console.log("find"+id);
		return this.findOne('{_id: id}')
				   .exec(cb);
	}
};
// console.log(CommentSchema.fetch);
module.exports = CommentSchema;