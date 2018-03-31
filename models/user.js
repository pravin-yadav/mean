const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    }

  });

  userSchema.pre('save', function(next) {
    // do stuff
    if(!this.isModified('password'))
        return next();
    

        bcrypt.hash(this.password, null, null,(err, hash) => {
            // Store hash in your password DB.
            if(err) return next(err);
            
            this.password = hash;
            next();
            
        });
    
  });

  module.exports = mongoose.model('User', userSchema);
