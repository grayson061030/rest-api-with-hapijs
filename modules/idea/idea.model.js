const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ideaSchema = new Schema({
    user: {type:Schema.Types.ObjectId,ref:'User'},
    title: {type:String, required:true},
    description: {type:String,required:true},
    created: {type:Date,default:Date.now},
    updated: {type:Date},
    deleted: {type:Date},
    meta : {
        votes: {
            down: { type: Number, default:0 },
            up: { type: Number, default:0 }
        },
        status:{type:Number,default:0}, // 0: 승인 대기, 1: 승인, 2: 차단)
        comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}] // 아이디어에 대한 코멘트
    }
});

module.exports = mongoose.model('Idea',ideaSchema);
