'use strict';

const Idea = require('./idea.model');

module.exports = {
    async create (req,reply) {
        try{
            const idea = await Idea.create({
                title: req.payload.title,
                description: req.payload.description,
                user: req.auth.credentials.id
            });
            return reply.response(idea);
        }catch(err) {
            throw Boom.badImplementation('Could not create Idea');
        }
    },
    async find(req,reply){
        try {
            // 페이징 처리
            const params = Object.assign({},req.query);
            params.offset = (params.page - 1) * params.limit;
            var options = {
                offset: params.offset,
                page: params.page,
                limit:params.limit,
                lean: false,
                populate: 'user',
                sort: {created: -1}
            };
            Idea.paginate({},options,function (err,res) {
                if(err) {
                    throw Boom.Boom.serverUnavailable('Server Error');
                }
                var result = {
                    data: res.docs,
                    total: res.total,
                    current_page: params.page,
                    last_page: Math.ceil(res.total/params.limit)
                }
                return reply.response(result);
            });

            // const ideas = await Idea.find({})
            //     .limit(params.limit)
            //     .skip(params.offset)
            //     .sort({created: 'desc'})
            //     .populate('user','-password -email -role -activate -created') // ignore user's info (password, email, role,activate, created)
            // return reply.response(ideas);
        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    findById(req,reply) {
        try {
            Idea.findById(req.params.id)
                .populate('user','-password -email -role -activate -created') // ignore user's info (password, email, role,activate, created)
                .exec(function (err, idea) {
                    if (err) {
                        return reply(err).code(404);
                    }
                    return reply.response(idea);
                });
        } catch (e) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    async update(req,reply){
        // 내가 작성한 아이디인지 검증
        const _idea = await Idea.findOne({
            _id: req.params.id
        });
        if(_idea.user._id == null || _idea.user._id != req.auth.credentials.id) {
            return reply('Bad Request').code(404);
        }
        let attributes = {};
        if(req.payload.title){
            attributes.title = req.payload.title;
        }
        if(req.payload.description){
            attributes.description = req.payload.description;
        }
        attributes.updated = Date.now();
        try {
            Idea.findByIdAndUpdate(req.params.id, attributes, {new: true}, (err, idea) => {
                if (err) {
                    return reply(err).code(500);
                }
                return reply.response(idea);
            });
        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    async delete(req,reply){
        try {
            // 내가 작성한 아이디인지 검증
            const _idea = await Idea.findOne({
                _id: req.params.id
            });
            if(_idea.user._id == null || _idea.user._id != req.auth.credentials.id) {
                return reply('Bad Request').code(404);
            }
            Idea.findByIdAndRemove(req.params.id, (err, result) => {
                if (err) {
                    return reply(err).code(500);
                }
                return reply.response({message: `idea deleted with id ${req.params.id}`})
            });
        } catch (e) {
            throw Boom.Boom.serverUnavailable(e);
        }
    },
    async findByUserId(req,reply){
        try {
            await Idea.find({user: req.params.id})
                .populate('user','-password -email -role -activate -created') // ignore user's info (password, email, role,activate, created)
                .exec(function (err, ideas) {
                    if (err) {
                        return reply(err).code(404);
                    }
                    return reply.response(ideas);
                });
        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    },
    async vote(req, reply) {
        try {
            // 아이디어에 대한 검증을 위해 해당 아이디어 정보 가져오기
            const _idea = await Idea.findOne({
                _id: req.params.idea_id
            });
            // 내가 작성한 아이디어 일 경우 투표 할 수 없으므로 단순 리턴
            if(_idea.user._id == req.auth.credentials.id) {
                return reply('Success');
            }
            // 투표 상태 생성
            let vote_result = req.params.vote == 'DOWN' ? {vote_down:req.auth.credentials.id} : {vote_up:req.auth.credentials.id};
            // 이미 투표 한 상태 체크 후 제거
            if(JSON.stringify(_idea.vote_up).includes(req.auth.credentials.id) || JSON.stringify(_idea.vote_down).includes(req.auth.credentials.id)){
                Idea.findByIdAndUpdate(req.params.idea_id, {$pull: vote_result}, {new: true},(err,idea) => {
                    if(err) {
                        return reply(err).code(500);
                    }

                    return reply.response(idea);
                });
            }else{
                Idea.findByIdAndUpdate(req.params.idea_id, {$push: vote_result}, {new: true},(err,idea) => {
                    if(err) {
                        return reply(err).code(500);
                    }
                    return reply.response(idea);
                });
            }

        } catch (err) {
            throw Boom.Boom.serverUnavailable('Server Error');
        }
    }
}
