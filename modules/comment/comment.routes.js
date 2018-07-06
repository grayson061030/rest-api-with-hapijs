'use strict';

const CommentController = require('./comment.controller');
const Joi = require('joi');
module.exports = [
    {
        path: '/comments',
        method: 'POST',
        config: {
            handler: CommentController.create,
            validate: {
                payload: Joi.object().keys({
                    description:Joi.string().required(),
                    idea: Joi.string().required()
                }),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            description: 'Created new Comment',
            tags: ['api','Comment'],
            notes: 'Response new created Comment'
        }
    }
]