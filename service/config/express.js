const config = require('./config'), 
    path = require('path'),
    express = require('express'), //引入express
    morgan = require('morgan'), //提供简单日志中间件
    compress = require('compression'), //提供响应内容压缩功能
    bodyParser = require('body-parser'), //包含几个处理请求数据的中间件
    methodOverride = require('method-override'),//提供对HTTP DELETE和PUT两个遗留方法的支持
    session = require('express-session'), //加载session中间件
    redisStore = require('connect-redis')(session);
       


module.exports = function() { 

    var app = express();

    app.use('/app',express.static(path.join(__dirname, '/../../app'))); //配置静态文件路由

    if(process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
       
    } else if (process.env.NODE_ENV == 'production') {
        app.use(compress());
    }

    app.use(bodyParser.json()); //(post)解析req中的body数据中的json数据,解析完毕放在req.body中
    app.use(bodyParser.urlencoded({extended: true}));//用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}
    app.use(methodOverride());
   
   
    app.use(session({
        name: 'mytest',
        secret: 'my_session_secret',
        rolling: true,
        resave: true,
        saveUninitialized: false,
        cookie: { 
            exipres: new Date(Date.now() + config.minute),//到期时间
            maxAge: config.minute
        },
        store: new redisStore({
            host: '127.0.0.1',
            port: '6379',
            db: 0,
            pass: '',
        })
    }));

    require('../routes/index.server.routes')(app); //配置路由

    return app;
};