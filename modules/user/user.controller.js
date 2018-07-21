'use strict';

const User = require('./user.model');
const UtilsService = require('../../services/util.service');
const JwtService = require('../../services/jwt.service');
const Boom = require('boom');

module.exports = {
    async signup(req, reply){
        try {
            const user = new User({
                email: req.payload.email,
                password: req.payload.password,
                username: req.payload.username
            });
            const encrypted_password = await UtilsService.hash_password(user.password);
            user.password = encrypted_password;
            const savedUser = await user.save();
            return reply.response('Signup successful !');
        } catch (err) {
            throw Boom.badImplementation('Signup Failed',err);
        }
    },
    async login(req,reply) {
        try {
            const user = await User.findOne({
                email: req.payload.email
            });

            if (!user) {
                reply(Boom.unauthorized('Invalid credentials provided'));
            }
            const matched = await UtilsService.compare_password(req.payload.password,user.password);
            if(matched){
                const token = JwtService.issue({
                    payload: {
                        id: user._id,
                        email: user.email
                    },
                    expiresIn: '1 day'
                });
                reply.response({token:token});
            }else{
                reply(Boom.unauthorized('Invalid credentials provided'));
            }
            reply.response(user);
        } catch (err) {
            throw Boom.unauthorized('Invalid credentials provided',err);
        }
    },
    async findme(req,reply){
        try {
            await User.findById(req.auth.credentials.id)
                .select('-password -role -__v -activate') //exclude fields
                .exec(function (err,user) {
                    if(err) {
                        return reply(err).code(404);
                    }
                    return reply.response(user)
                })

        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    }
}
