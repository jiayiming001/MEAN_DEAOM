module.exports = function(app) {
    var index = require('../constrollers/index.server.constroller');
    app.get('/', index.render);
};