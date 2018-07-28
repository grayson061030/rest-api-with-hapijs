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
            //Fixme: sending email for validate users email
            //ex: 이메일 전송 링크생성 및 전송 (ex: http://localhost/users/validation/email/woiwerwo1ksoi12)
            return reply.response('Signup successful !');
        } catch (err) {
            throw Boom.badImplementation('Signup Failed',err);
        }
    },
    async email_validation(req,reply) {
      //TODO: 전송한 이메일 유효성 확인을 위한 값 검사 및 사용자 활성화
        try {
            return reply.response('Success email validation');
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server error');
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
    },
    profile(req,reply){
        try{
            User.findById(req.params.id)
                .select('-password -role -__v -activate -created')
                .exec(function (err,user) {
                    if(err) {
                        return reply(err).code(404);
                    }
                    return reply.response(user);
                })
        } catch(err){
            throw Boom.Boom.serverUnavailable('Server error');
        }
    },
    async update_avatar(req,reply) {
        //Todo: avatar 이미지 업데이트 (avatar_image_directories+'/'+user._id+'.png or jpg')
        try {
            console.log(req.payload['avatar'].hapi.filename);
            return reply.response('Success'); // fixme: 업데이트 된 사용자 정보와 변경된 이미지를 포함하여 리턴
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    async update_me(req,reply){
        //Todo: 유저 정보 업데이트
        //username,about,
        try {
            return reply.response('Success');
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    async delete_me(req,reply){
        //Todo: 유저 삭제
        try {
            return reply.response('Success deleted');
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    async reset_password(req,reply){
        //Todo: 유저 패스워드 변경
        //가입 유저의 이름과 이메일 확인 , 임시비밀번호 저장 및 이메일로 임시 비밀번호 전송
        try {
            return reply.response('Success send email temp password');
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    }
}
