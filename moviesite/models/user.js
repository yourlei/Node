var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.modules('User', UserSchema);

module.exports = User;