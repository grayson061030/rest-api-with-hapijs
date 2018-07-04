'use strict';
const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
module.exports = {
    async hash_password(password){
        try {
            return await bcrypt.hash(password, SALT_ROUND);
        } catch (err) {
            throw err;
        }
    },
    async compare_password(password,hash){
        try{
            return await bcrypt.compare(password,hash);
        }catch(err){
            throw err;
        }
    }
}
