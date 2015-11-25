/**
 * AuthController
 *
 * @description :: Server-side logic for managing AuthController
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var jwt = require('jwt-simple');
var md5 = require('md5');

module.exports = {

    register: function(req, res) {
        var user = req.body;
        var email = user.email || '';
        var password = user.password || '';

        // name is optional
        if (email.trim() == '' || password.trim() == '') {
            return res.unAuthorized('邮箱地址或密码为空，请重新输入！');
        }
        var saltPassword = md5(password);

        UserInfo.create({   name: user.name,
                            email: email,
                            password: saltPassword
        }).exec(function(e, c){
            if (e) {

                console.log("err: ", e);
                console.log("err.invalidAttributes: ", e.invalidAttributes)

                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (e.invalidAttributes && e.invalidAttributes.email && e.invalidAttributes.email[0]
                    && e.invalidAttributes.email[0].rule === 'unique') {
                    return res.emailAddressInUse('邮箱已被注册');
                }

                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(e);
            }else{
                delete c.password;
                return res.json({MyInfo: genToken(c)});
            }
        });
    },

    login: function(req, res) {
        var user = req.body;
        var email = user.email || '';
        var password = user.password || '';

        if (email.trim() == '' || password.trim() == '') {
            // res, status, data, message, err
            sails.log.verbose('邮箱地址或密码为空。');
            return res.unAuthorized('邮箱地址或密码为空，请重新输入！');
        }

        UserInfo.findOne({email:email}).populate('city').exec(function(e, r){
            if (e) return res.negotiate(e);
            if (!r) return res.notFound("邮箱地址或密码错误！");
            var saltPassword = md5(password);
            if(saltPassword == r.password){
                delete r.password;
                return res.json({MyInfo: genToken(r)});
            }else{
                return res.forbidden("邮箱地址或密码错误！");
            }
        });
    },

    test: function(req, res){
        if(req.headers.authorization)
        return res.ok();
        return res.unAuthorized('邮箱地址或密码为空，请重新输入！');
    },

    validate: function(id, callback) {

        UserInfo.findOne({userid:id}).exec(function(e, r){
            if (e) return res.negotiate(e);
            if (!r) return res.notFound("没找到！");
            if(typeof callback === 'function') callback();
        });
    }

};

// private method
function genToken(user) {
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
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

