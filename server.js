process.env.NODE_ENV = process.env.NODE_ENV || 'development';//设置一个环境变量,表示处于开发环境或生产环境
var express = require('./service/config/express');
var app = express();
app.listen(3001);
console.log("Server running at http://localhost:3001");