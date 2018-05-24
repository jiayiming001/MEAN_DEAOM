const db = require("../dbApi/db");
const modelDbName = "users";

function createUser() { 
    var app = new User();
    return app;
}

//因为使用的new, 所以User()是一个构造函数
function User(){
    'use strict';
    var self = this;

    self.obj = (params) => {
        return {
                "username": params.username,
                "password": params.password,
                'phone': params.phone
            };
    };


    self.add = (data, option, callback) => {
        let obj = self.obj(data);
        db.insert(modelDbName, obj, option,callback);
    };


    self.edit = (query, option, callback) => {
        db.updata(modelDbName, query, option, callback);
    };

    
    self.delete = (query, option, callback) => {
        db.delete(modelDbName, query, option,  callback);
    };


    self.getdata = (query, option, callback, mod="one") => {
        db.getdata(modelDbName ,query, option, callback, mod);
    }; 
}


exports = module.exports = createUser;
