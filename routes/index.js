module.exports = function(router){
    require('./login')(router);
    require('./list')(router);
    require('./home')(router);
    require('./control')(router);
};