'use strict';
const UserController = require('./user.controller');
const Joi = require('joi');
module.exports = [
    {
        path: '/users/signup',
        method: 'POST',
        config: {
            handler: UserController.signup,
            validate: {
                payload: Joi.object().keys({
                    username: Joi.string().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            description: 'User can create new Account',
            tags: ['api','User'],
            notes: 'Response new created User',
            auth: false
        }
    },
    {
        path: '/users/login',
        method: 'POST',
        config: {
            handler: UserController.login,
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            description: 'User can Login  Account',
            tags: ['api','User'],
            notes: 'Response JWT',
            auth: false
        }
    }
]
