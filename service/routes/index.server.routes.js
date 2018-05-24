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
        res.sendFile(path.join(__dirname + '/../views/index.html'));  
    });
    
    
    app.get('/register', function (req, res) {
        res.sendFile(path.join(__dirname + '/../views/index.html'));
    });
     
    app.get('/', function (req, res) {
        res.redirect('/login');
    });

    app.get('/user', function (req, res) {
       res.redirect('/login'); 
    });

    app.post('/login/submit', function(req, res) {
        let params = req.body;
        if(params.user === '123' && params.password === '123'){
            req.session.isFirst = {'username': params.user};
            res.json({'status': 'ok'});
        } else {
            res.json({'status': 'fail'});
        }
    });

    app.post('/session', function(req, res) {
        if(req.session.isFirst) {
            console.log('欢迎再次访问');
            res.json({'status': 'ok'});
        } else {
            console.log('第一次访问需要登录验证');
            res.json({'status': 'fail'});
        }
    });

};