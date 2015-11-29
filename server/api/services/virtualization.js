var jwt = require('jwt-simple');

module.exports = {

    genToken:function (user) {
        var expires = expiresIn(7); // 7 days
        var token = jwt.encode({
            exp: expires,
            user: user,
        }, require('../utils/secret'));
        return {
            token: token,
            expires: expires,
            user: user
        };
    },

    decToken:function(token){
        return jwt.decode(token, require('../utils/secret.js'));
    },

}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

