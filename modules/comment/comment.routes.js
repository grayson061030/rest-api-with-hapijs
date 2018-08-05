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
    },
    {
        path: '/comments/{id}',
        method: 'DELETE',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: CommentController.delete,
            tags: ['api','Comment'],
            description: 'Delete comment',
            notes: 'Response delete success message'
        }
    },
    {
        path: '/comments/{id}',
        method: 'PUT',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                payload: Joi.object().keys({
                    description: Joi.string().required()
                }),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: CommentController.update,
            tags: ['api','Comment'],
            description: 'Update Comment By Id',
            notes: 'Response update Comment'
        }
    },
    {
        path: '/comments/{id}',
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: CommentController.findByIdeaId,
            tags: ['api','Comment'],
            description: 'Find Comments By IdeaId',
            notes: 'Response a Comments'
        }
    }
]