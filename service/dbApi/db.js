const monk = require('monk');
const url = '10.244.4.139:27017,10.244.4.139:27027,10.244.4.139:27037/MEAN?replicaSet=rs0';
const db = monk(url);
const users = db.get('users');

db.then(() => {
    console.log('db ok');
});


//建议重新创建一个文件
//获取数据
db.getdata = (collectionName, query, option, callback, mod) => {
    const collection = db.get(collectionName);
    if(typeof query === 'function') {
        callback = query;
        query = {};
        option = {};
    } else if (typeof option == 'function') {
        callback = option;
        option = {};
    }
    query.del = {$ne: true};
    if(mod === "one") {
        collection.findOne(query, option).then(callback);
    } else  {
        collection.find(query, option, callback);
    }
};

//插入数据
db.insert =  (collecteName, data, option, callback) => {
    const collection = db.get(collecteName);
    if (typeof option === 'function') {
        callback = option;
        option = {};
    }
    collection.insert(data, option, callback);
};

//更新数据
db.updata = (collecteName, query, option, callback) => {
    const collection = db.get(collecteName);
    collection.update(query, option, callback);

}

//删除数据
db.delete = (collecteName, query, option, callback) => {
    const collection = db.get(collecteName);
    if (typeof option === 'function') {
        callback = option;
        option = {};
    }
    collection.remove(query, option, callback);

}
module.exports = db;