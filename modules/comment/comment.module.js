'use strict';

const commentRoutes = require('./comment.routes');
const CommentModule = {
    register: function (server, options, next) {
        server.route(commentRoutes);
        next();
    }
};

CommentModule.register.attributes = {
    name: 'CommentModule',
    pkg: require('../../package')
};

module.exports = CommentModule;