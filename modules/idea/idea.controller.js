'use strict';

const Idea = require('./idea.model');

module.exports = {
    async create (req,reply) {
        try{
            const idea = await Idea.create({
                title: req.payload.title,
                description: req.payload.description,
                user: req.auth.credentials.id
            });
            return reply.response(idea);
        }catch(e) {
            throw Boom.badImplementation('Could not create Idea');
        }
    },
    async find(req,reply){
        try {
            const ideas = await Idea.find({})
                .populate('user')
                .populate('comments');
            return reply.response(ideas);
        } catch (e) {
            throw err;
        }
    },
    findById(req,reply) {
        Idea.findById(req.params.id)
            .populate('user')
            .exec(function (err,idea) {
                if(err){
                    return reply(err).code(404);
                }
                return reply.response(idea);
            });
    },
    update(req,reply){
        let attributes = {};
        if(req.payload.title){
            attributes.title = req.payload.title;
        }
        if(req.payload.description){
            attributes.description = req.payload.description;
        }
        attributes.updated = Date.now();
        Idea.findByIdAndUpdate(req.params.id,attributes,{new: true},(err,idea)=>{
            if(err){
                return reply(err).code(500);
            }
            return reply.response(idea);
        });
    },
    delete(req,reply){
        Idea.findByIdAndRemove(req.params.id,(err,result)=>{
            if(err) {
                return reply(err).code(500);
            }
            return reply.response({message: `idea deleted with id ${req.params.id}`})
        });
    },
    async findByUserId(req,reply){
        try {
            await Idea.find({user: req.params.id})
                .populate('user')
                .exec(function (err, ideas) {
                    if (err) {
                        return reply(err).code(404);
                    }
                    return reply.response(ideas);
                });
        } catch (e) {
            throw e;
        }
    }
}