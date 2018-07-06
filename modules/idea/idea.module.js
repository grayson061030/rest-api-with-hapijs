'use strict';

const ideaRoutes = require('./idea.routes');
const IdeaModule = {
    register: function (server, options, next) {
        server.route(ideaRoutes);
        next();
    }
};

IdeaModule.register.attributes = {
    name: 'IdeaModule',
    pkg: require('../../package')
};

module.exports = IdeaModule;