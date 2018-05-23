const path = require("path");

exports.render = function(req, res) {

    if(req.session['count'] == null) {
        req.session['count'] = 1; 
    }else {
        req.session['count']++;
    }
    console.log(req.session['count'])
    res.sendFile(path.join(__dirname + '/../views/index.html'));
}
