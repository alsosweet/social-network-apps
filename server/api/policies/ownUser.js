module.exports = function(req, res, next) {

  var userId = req.body.userid;
  var currentUserId = req.token.user.userid;

  if (userId != currentUserId) {
    return res.json(403, {err: 'You are not allowed to do that'});
  }

  next();
};
