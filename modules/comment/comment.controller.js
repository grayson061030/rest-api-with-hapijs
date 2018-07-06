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
            throw err;
        }
    }
}