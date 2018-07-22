const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ideaSchema = new Schema({
    user: {type:Schema.Types.ObjectId,required: true,ref:'User'},
    title: {type:String, required:true},
    description: {type:String,required:true},
    created: {type:Date,default:Date.now},
    updated: {type:Date},
    deleted: {type:Date},
    vote_down: [{type: Schema.Types.ObjectId, ref: 'User'}],
    vote_up: [{type: Schema.Types.ObjectId, ref: 'User'}],
    status:{type:Number,default:0}, // 0: 대기, 1: 승인, 2: 삭제 ,3: 차단)
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Ideas',ideaSchema);
