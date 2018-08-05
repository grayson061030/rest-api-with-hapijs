'use strict';

const Comment = require('./comment.model');
const Idea = require('../idea/idea.model');

module.exports = {
    async create(req,reply){
        try {
            const comment = await Comment.create({
                description: req.payload.description,
                idea: req.payload.idea,
                user: req.auth.credentials.id
            });
            const _idea = await Idea.findById(req.payload.idea);
            _idea.comments.push(comment);
            await _idea.save();
            return reply.response(comment);
        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    async delete(req,reply){
        try {
            return reply.response({message: `comment deleted by id ${req.params.id}`});
        } catch (e) {
            throw Boom.Boom.serverUnavailable(e);
        }
    },
    async update(req,reply){
        //Todo: 내가 작성한 코멘트인지 검증
        try {
            return reply.response({message: `comment updated by id ${req.params.id}`});
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    findByIdeaId(req,reply){
        try {
            //todo: adding pagenation
            Comment.find({'idea':req.params.id})
                .populate('user','-password -role -activate -created')
                .exec(function (err, comment) {
                    if (err) {
                        return reply(err).code(404);
                    }
                    return reply.response(comment);
                });
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    }
}