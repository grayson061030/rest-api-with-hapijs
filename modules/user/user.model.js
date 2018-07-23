'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String,requied: true},
    thumbnail:{type: String, default:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y'},
    email: {type: String, unique:true,lowercase:true},
    password: {type:String,trim:true, select: false}, // password 필드를 출력 하려면 findOne({_id: id}).select('+password').exec......
    facebook:{
        id: {type: String,select: false},
        accessToken: {type: String,select: false},
        refreshToken: {type: String,select: false}
    },
    updated:{type:Date,select: false},
    created:{type:Date,default:Date.now,select: false},
    deleted:{type:Date,select: false},
    role: {type:Number,default: 0,select: false},
    activate:{type:Boolean,default:false,select: false} // true: deleted
});

module.exports = mongoose.model('User',UserSchema);
