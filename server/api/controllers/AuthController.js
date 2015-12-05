/**
 * AuthController
 *
 * @description :: Server-side logic for managing AuthController
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
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
                return res.json({MyInfo: jwtAuth.genToken(c)});
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

        UserInfo.findOne({email:email}).populate('city').populate('gifts').exec(function(e, r){
            if (e) return res.negotiate(e);
            if (!r) return res.notFound("邮箱地址或密码错误！");

            var saltPassword = md5(password);
            if(saltPassword == r.password){
                return res.json({MyInfo: jwtAuth.genToken(r)});
            }else{
                return res.forbidden("邮箱地址或密码错误！");
            }
        });
    },

    logout: function(req, res){

        UserInfo.unsubscribe(req.socket, req.token.user);
        req.token = null;
        return res.ok();
    },

    validate: function(id, callback) {

        UserInfo.findOne({userid:id}).exec(function(e, r){
            if (e) return res.negotiate(e);
            if (!r) return res.notFound("没找到！");
            if(typeof callback === 'function') callback();
        });
    }

};

