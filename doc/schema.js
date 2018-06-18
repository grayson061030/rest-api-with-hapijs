const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
        profile:{ 
            username: String,
            thumbnail:{type: String, default:'default_thumbnail.png'},
            email: {type: String, unique:true,lowercase:true },
            password: {type:String,trim:true}
        },
        social: {
            facebook: {
                id: String,
                accessToken: String
            },
            google: {
                id: String,
                accessToken:String
            }
        },
        updatedAt:{type:Date},
        createdAt:{type:Date,default:Date.now},
        deletedAt:{type:Date},
        level: {type:Number,default: 0},
        activate:{type:boolean,default:false},
        ideas:[{type:mongoose.Schema.Types.ObjectId,ref:'Idea'}]
    });
const ideaSchema = new mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId,ref:'Member'},
    title: {type:String, required:true},
    content: {type:String,required:true},
    createdAt: {type:Date,default:Date.now},
    votes: {
        like: [{type:Number,default:0,ref:'Member'}],
        unlike: [{type:Number,default:0,ref:'Member'}]
    },
    status:{type:Number,default:0}
});
const Member = mongoose.model('Member',memberSchema);
const Idea = mongoose.model('Idea',ideaSchema);