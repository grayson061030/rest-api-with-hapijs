'use strict';

const UserModule = require('../modules/user/user.module');
const IdeaModule = require('../modules/idea/idea.module');
const CommentModule = require('../modules/comment/comment.module');
const MongoosePlugin = require('../plugins/mongoose.plugin');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const goodOptions = {
    // ops: {
    //     interval: 3000
    // },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*'}]
        },{
            module: 'good-console'
        },'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*'}]
        },{
            module: 'good-squeeze',
            name: 'SafeJson'
        },{
            module: 'good-file',
            args: ['./logs/hapi-api.log']
        }]
        // myHTTPReporter: [{
        //     module: 'good-squeeze',
        //     name: [{ error: '*'}]
        // },{
        //     module: 'good-http',
        //     args: ['http://prod.logs:3000',{
        //         wreck: {
        //             headers: {'x-api-key': 12345}
        //         }
        //     }]
        // }]
    }
}
module.exports = [
    {
        register: MongoosePlugin,
        options: {
            mongo_db_uri: 'mongodb://localhost:27017/todonotodo'
        }
    },
    {
        register: HapiSwagger,
        options: {
            info: {
                title: 'Todonotodo API Documentation',
                version: '0.0.1'
            }
        }
    },
    require('hapi-auth-jwt2'),
    {
        register: require('good'),
        options: goodOptions
    },
    Inert,
    Vision,
    UserModule,
    IdeaModule,
    CommentModule
];
