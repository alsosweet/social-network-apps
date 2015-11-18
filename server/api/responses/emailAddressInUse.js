/**
 * Usage:
 *
 * ```
 * res.emailAddressInUse();
 * ```
 *
 */

module.exports = function emailAddressInUse (data){

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;
  var req = this.req;
  // Set status code
  res.status(409);

  // If appropriate, serve data as JSON(P)
  if (req.wantsJSON) {
    return res.jsonx(data);
  }
};
