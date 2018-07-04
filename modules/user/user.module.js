'use strict';
const userRoutes = require('./user.routes');
const UserModule = {
    register: (server,options,next) => {
        server.route(userRoutes);
        next();
}
};

UserModule.register.attributes = {
    name: 'UserModule',
    pkg:require('../../package')
};

module.exports = UserModule;
