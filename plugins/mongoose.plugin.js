const mongoose = require('mongoose');
const MongoosePlugin = {
    register: function (server,options,next) {
        mongoose.Promise = require('bluebird');
        mongoose.connect(options.mongo_db_uri);
        mongoose.connection.on('connected',()=> {
            console.log(`server is connected to ${options.mongo_db_uri}`);
        });
        mongoose.connection.on('error',err => {
            console.log('Error while connecting to mongodb',err);
        });
        next();
    }
};

MongoosePlugin.register.attributes = {
    name: 'MongoosePlugin',
    pkg: require('../package.json')
};
module.exports = MongoosePlugin;
