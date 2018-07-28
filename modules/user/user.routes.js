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
    },
    {
        path: '/users/me', // my info
        method: 'GET',
        config: {
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: UserController.findme,
            tags: ['api','user'],
            description: 'Find user info',
            notes: 'Response a User'
        }
    },
    {
        path: '/users/{id}', // other user info
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                }),
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown()
            },
            handler: UserController.profile,
            tags: ['api', 'user'],
            description: 'Find User profile',
            notes: 'Response a user',
            auth: false
        }
    },
    {
        path: '/users/me/avatar',
        method: 'PUT',
        config: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                maxBytes: 2 * 1000 * 1000,
            },
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: UserController.update_avatar,
            tags: ['api','user'],
            description: 'update user avatar',
            notes: 'Response Success message'
        }
    },
    {
        path: '/users/me',
        method: 'PUT',
        config: {
            validate: {
                payload: Joi.object().keys({
                    username: Joi.string().optional(),
                    about: Joi.string().optional()
                }),
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: UserController.update_me,
            tags: ['api','User'],
            description: 'Update User info',
            notes: 'Response update User'
        }
    },
    {
        path: '/users/me',
        method: 'DELETE',
        config: {
            validate: {
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            handler: UserController.delete_me,
            tags: ['api','User'],
            description: 'Delete User',
            notes: 'Response delete success message'
        }
    },
    {
        path: '/users/validation/email/{id}', // 이메일로 전송된 링크 (ex: http://localhost/users/validation/email/woiwerwo1ksoi12)
        method: 'GET',
        config: {
            validate: {
                params: Joi.object().keys({
                    id: Joi.string().required()
                })
            },
            handler: UserController.email_validation,
            tags: ['api','User'],
            description: 'Validation User email',
            notes: 'Response validation success message',
            auth: false
        }
    },
    {
        path: '/users/reset/password',//로그인 전 사용자
        method: 'POST',
        config: {
            validate: {
                payload: Joi.object().keys({
                    username: Joi.string().required(),
                    email: Joi.string().email().required()
                })
            },
            handler: UserController.reset_password,
            tags: ['api','User'],
            description: 'Reset password',
            notes: 'Response success message',
            auth: false
        }
    }
]
