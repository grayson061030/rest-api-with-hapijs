'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String,requied: true},
    avatar:{type: String, default:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y'},
    about: {type: String,default: 'Hello Todonotodo!'},
    email: {
        type: String, unique: true, lowercase: true,
        validation: {type: String,unique:true},// 이메일 확인을 위해 전송된 값
        activate: {type: Boolean,default:true} // 이메일 확인
    },
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
    activate:{type:Boolean,default:true}
});

module.exports = mongoose.model('User',UserSchema);
