const path = require("path");
const user = require('../models/users');

module.exports = function(app) {
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
        let query = {
            'username': req.body.user,
            'password': req.body.password
        };
        let option = {};
        let callback = (docs) => {
            if(docs) {
                req.session.isFirst = {'username': req.body.user};
                res.json({'status': 'ok'});
            } else {
                res.json({'status': 'fail'});
            }
        }; 
        user().getdata(query, option, callback);
    });

    app.post('/session', function(req, res) {
        if(req.session.isFirst) {
            console.log('欢迎再次访问');
            res.json({
                'status': 'ok',
                'username': req.session.isFirst.username
            });
        } else {
            console.log('第一次访问需要登录验证');
            res.json({'status': 'fail'});   
        }
    });

    app.post('/register/submit', function(req, res){
        let params = req.body;
        console.log(params);
        if(params.username && params.password) {
            user().add(params, {}, (err, docs)=> {
                if(docs) {
                    req.session.isFirst = {'username': params.username};
                    res.json({'status':'ok'});
                } else {
                    res.json({'status': 'fail'});
                }
            });
        }
    });

};