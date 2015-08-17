var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
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
MovieSchema.pre('save', function(next){
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
MovieSchema.statics  = {
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
// console.log(MovieSchema.fetch);
module.exports = MovieSchema;