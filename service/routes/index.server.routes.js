const path = require("path");
module.exports = function(app) {
   // var index = require('../constrollers/index.server.constroller');
    app.use(function (req, res, next) {  //angular使用了html5Model,路由没有了#,后端过滤后把路由给前端
        if(req.path.indexOf("/api")>=0) {
            res.send("API server");
        } else {
            next('route');
        }
    });

    app.get('/login', function (req, res, next) {
        if (req.session.isFirst) {
            console.log('欢迎再次访问');
            console.log(req.session.isFirst);
        } else {
            req.session.isFirst = { 'username': '123' }
            console.log('欢迎第一次访问');
        }
        res.sendFile(path.join(__dirname + '/../views/index.html'));
    });
    
    app.get('/register', function (req, res) {
        res.sendFile(path.join(__dirname + '/../views/index.html'));
    })
     
    app.get('/', function (req, res) {
        res.redirect('/login');
    })
};