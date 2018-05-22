const config = require('./config'), 
    express = require('express'), //引入express
    morgan = require('morgan'), //提供简单日志中间件
    compress = require('compression'), //提供响应内容压缩功能
    bodyParser = require('body-parser'), //包含几个处理请求数据的中间件
    methodOverride = require('method-override'),//提供对HTTP DELETE和PUT两个遗留方法的支持
   // cookieParse = require('cookie-parser'),//解析cookies,结果放在req.cookies中
    cookieSession = require('cookie-session');//会话中间件
    
const Keygrip = require('keygrip');
    

module.exports = function() { 
    var app = express();

    if(process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
       
    } else if (process.env.NODE_ENV == 'production') {
        app.use(compress());
    }

    app.use(bodyParser.json()); //(post)解析req中的body数据中的json数据,解析完毕放在req.body中
    app.use(bodyParser.urlencoded({extended: true}));//用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}
    app.use(methodOverride());
    app.use(express.static('../public'));
    
    // app.use(session({
    //     saveUninitialized: true,
    //     resave: true,
    //     secret: config.sessionSecret
    // }));

    app.use(cookieSession({
        keys: ['key1', 'key2'],
        maxAge: 60 * 60,
        name: 'session'
    }));

    require('../routes/index.server.routes')(app);
    return app;
};