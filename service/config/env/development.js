const Keygrip = require('keygrip');

module.exports = {
    sessionSecret: new Keygrip(['key1', 'key2'], 'SHA384', 'base64')
}