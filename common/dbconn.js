var monk = require('monk');
var conn = null;

module.exports = function() {
    if (conn == null) {
        conn = monk('localhost:27017/proj-plan');
    }
    return conn;
};
