'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String,requied: true},
    thumbnail:{type: String, default:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y'},
    email: {type: String, unique:true,lowercase:true},
    password: {type:String,trim:true},
    facebook:{
        id: {type: String},
        accessToken: {type: String},
        refreshToken: {type: String}
    },
    updated:{type:Date},
    created:{type:Date,default:Date.now},
    deleted:{type:Date},
    role: {type:Number,default: 0},
    activate:{type:Boolean,default:false} // true: deleted
});

module.exports = mongoose.model('User',UserSchema);
