'use strict';

const IdeaController = require('./idea.controller');
const Joi = require('joi');

const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports = [
    {
        path: '/ideas',
        method: 'POST',
        config: {
            validate: {
                payload: schema,
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
            validate: {
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
                    description: Joi.string().optional(),
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
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: IdeaController.findByUserId,
            tags: ['api','Idea'],
            description: 'find By user id',
            notes: 'Response ideas of user'
        }
    }
];