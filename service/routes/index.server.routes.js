const path = require("path");
module.exports = function(app) {
   // var index = require('../constrollers/index.server.constroller');
    app.use(function (req, res) {  //angular使用了html5Model,路由没有了#,后端过滤后把路由给前端
        if(req.path.indexOf("/api")>=0) {
            res.send("API server");
        } else {
            if(req.session['count'] == null) {
                req.session['count'] = 1; 
            }else {
                req.session['count']++;
            }
            console.log(req.session['count'])
            res.sendFile(path.join(__dirname + '/../views/index.html'));
        }
    });
     
};