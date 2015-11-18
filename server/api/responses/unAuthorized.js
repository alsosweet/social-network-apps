/**
 * Usage:
 *
 * ```
 * res.unAuthorized();
 * res.unAuthorized(data);
 * ```
 *
 */

module.exports = function unAuthorized (data, options){

  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(401);

  // If the user-agent wants JSON, always respond with JSON
  if (req.wantsJSON) {
    return res.jsonx(data);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === 'string') ? { view: options } : options || {};

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.
  if (options.view) {
    return res.view(options.view, { data: data });
  }

  // If no second argument provided, try to serve the implied view,
  // but fall back to sending JSON(P) if no view can be inferred.
  else return res.guessView({ data: data }, function couldNotGuessView () {
    return res.jsonx(data);
  });
};
