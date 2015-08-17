var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
	user:{
		unique: true,
		name: String
	},
	password: String,
	role: {
		type: Number,
		default: 0
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		update: {
			type: Date,
			default: Date.now()
		}
	}
});

userSchema.pre('savd', function(next){
	var user = this;

	if(this.isNew)
	{
		this.meta.createAt = this.meta.update = Date.now();
	}
	else
	{
		this.meta.update = Date.now();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if (err) 
		{
			return next(err);
		}

		bcrypt.hash(user.password, salt, function(err, hash){
			if(err)
			{
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});
UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err);

      cb(null, isMatch);
    });
  }
}

UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb);
  }
}

module.exports = userSchema;