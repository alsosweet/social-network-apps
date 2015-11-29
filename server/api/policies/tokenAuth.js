/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.headers.authorization) {
    var token = req.headers.authorization;
  }else if(req.socket&&req.param('token')){
    var token = req.param('token');
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  }else{
    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.unAuthorized('need to authorized.');
  }

  req.token = jwtAuth.decToken(token);
  return next();
};
