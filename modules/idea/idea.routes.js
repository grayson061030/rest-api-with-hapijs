'use strict';

const IdeaController = require('./idea.controller');
const Joi = require('joi');

module.exports = [
    {
        path: '/ideas',
        method: 'POST',
        config: {
            validate: {
                payload: Joi.object().keys({
                        title: Joi.string().required(),
                        description: Joi.string().required()
                    }),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: IdeaController.create,
            description:'Create new Idea',
            tags: ['api','Idea'],
            notes: 'Response new created Idea'
        }
    },
    {
        path: '/ideas',
        method: 'GET',
        config:{
            handler: IdeaController.find,
            tags: ['api','Ideas'],
            description: 'Find all Idea',
            notes: 'Response all the idea',
            auth: false,
            validate: {
                query: {
                    page: Joi.number().integer().positive(),
                    limit: Joi.number().integer().default(5)
                },
                headers: Joi.object({
                    'authorization' : Joi.string().optional()
                }).unknown()
            }
        }
    },
    {
        path: '/ideas/{id}',
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
            handler: IdeaController.findById,
            tags: ['api','Idea'],
            description: 'Find Idea By id',
            notes: 'Response a Idea'
        }
    },
    {
        path: '/ideas/{id}',
        method: 'PUT',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                payload: Joi.object().keys({
                    title: Joi.string().optional(),
                    description: Joi.string().optional()
                }),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: IdeaController.update,
            tags: ['api','Idea'],
            description: 'Update Idea By Id',
            notes: 'Response update idea'
        }
    },
    {
        path: '/ideas/{id}',
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
            handler: IdeaController.delete,
            tags: ['api','Idea'],
            description: 'Delete Idea by  Id',
            notes: 'Response message and Idea id'
        }
    },
    {
        path: '/ideas/users/{id}',
        method: 'GET',
        config: {
            validate: {
                query: {
                    page: Joi.number().integer().positive(),
                    limit: Joi.number().integer().default(5)
                },
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                headers: Joi.object({
                    'authorization' : Joi.string().optional()
                }).unknown()
            },
            handler: IdeaController.findByUserId,
            tags: ['api','Idea'],
            description: 'find By user id',
            notes: 'Response ideas of user',
            auth: false
        }
    },
    {
        path: '/ideas/vote/{idea_id}/{vote}',
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    idea_id: Joi.string().required(),
                    vote: Joi.string().valid('UP','DOWN').required()
                }),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: IdeaController.vote,
            tags: ['api','Idea'],
            description: 'vote idea',
            notes: 'Response message'
        }
    }
];
