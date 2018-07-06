'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String,requied: true},
    thumbnail:{type: String, default:'default_thumbnail.png'},
    email: {type: String, unique:true,lowercase:true},
    password: {type:String,trim:true},
    facebook:{
        id: {type: String},
        accessToken: String,
        refreshToken: String
    },
    updated:{type:Date},
    created:{type:Date,default:Date.now},
    deleted:{type:Date},
    role: {type:Number,default: 0},
    activate:{type:Boolean,default:false} // true: deleted
});

module.exports = mongoose.model('User',UserSchema);
