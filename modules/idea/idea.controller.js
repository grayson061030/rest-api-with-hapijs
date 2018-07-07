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
        }catch(err) {
            throw Boom.badImplementation('Could not create Idea');
        }
    },
    async find(req,reply){
        try {
            const ideas = await Idea.find({})
                .populate('user','-password -email -role -activate -created') // ignore user's info (password, email, role,activate, created)
            return reply.response(ideas);
        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    findById(req,reply) {
        try {
            Idea.findById(req.params.id)
                .populate('user','-password -email -role -activate -created') // ignore user's info (password, email, role,activate, created)
                .exec(function (err, idea) {
                    if (err) {
                        return reply(err).code(404);
                    }
                    return reply.response(idea);
                });
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
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
        try {
            Idea.findByIdAndUpdate(req.params.id, attributes, {new: true}, (err, idea) => {
                if (err) {
                    return reply(err).code(500);
                }
                return reply.response(idea);
            });
        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    delete(req,reply){
        try {
            Idea.findByIdAndRemove(req.params.id, (err, result) => {
                if (err) {
                    return reply(err).code(500);
                }
                return reply.response({message: `idea deleted with id ${req.params.id}`})
            });
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    async findByUserId(req,reply){
        try {
            await Idea.find({user: req.params.id})
                .populate('user','-password -email -role -activate -created') // ignore user's info (password, email, role,activate, created)
                .exec(function (err, ideas) {
                    if (err) {
                        return reply(err).code(404);
                    }
                    return reply.response(ideas);
                });
        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    }
}