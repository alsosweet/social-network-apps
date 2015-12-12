/**
 * SettingController
 *
 * @description :: Server-side logic for managing settings
 * get /
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    /*policies:isAuth and have req.headers.authorization*/
    info: function(req, res){

        var token = req.token;

        if(req.param('id') == token.user.userid){
            UserInfo.find({userid:req.param('id')}).populate('city').populate('gifts').exec(function(e, r){
                if(e) return sails.log.error('viewUserInfo:when find one userinfo,an error occured Details:',e);
                if (r.length == 0) return res.notFound();

                UserInfo.subscribe(req.socket, r);

                return res.json({UserInfo: r});
            });
        }else{
            UserInfo.find({userid:req.param('id')}).populate('city').populate('gifts').exec(function(e, r){
                if(e) return sails.log.error('viewUserInfo:when find one userinfo,an error occured Details:',e);
                if (r.length == 0) return res.notFound();

                Seen.updateOrCreate(r[0].userid,token.user.userid).then(function(ua) {
                    // ... success logic here
                    UserInfo.publishUpdate(req.param('id'), {
                        fromuser:token.user,
                        seen:ua,
                        action: 1,//' 某人看了你'
                    });
                }).catch(function(e) {
                    // ... error handling here
                    return;
                });

/*
                    exec(function(err,data){
                    if(err) return;
                    // Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.
                    UserInfo.publishUpdate(req.param('id'), {
                        fromuser:token.user,
                        seen:data,
                        action: 1,//' 某人看了你'
                    });
                });*/

                return res.json({UserInfo: virtualization.varatr(r, null)});
            });
        }
    },

    UserPage: function(req, res){

        BrowseServices.userscount(function(err, total){

            if(err) return sails.log.error('viewUserPage:',err);
            req.total = total;
            Pagination.page(req, res);
            UserInfo.find().paginate({ page: req.page.number, limit: req.page.perpage }).exec(function(e, r) {
                if(e) return sails.log.error('viewUserInfo:when find one userinfo,an error occured Details:',e);

                return res.json({UserInfo: virtualization.varatr(r, {from:req.page.from})});
            });

        });
    },

    checkin: function(req, res){

        var token = req.token;

        UserInfo.findOne({userid:token.user.userid}).exec(function(e, r){
            if(e) return sails.log.error('viewUserInfo:when find one userinfo,an error occured Details:',e);
            if (!r) return res.notFound();

            if(phpDate.time() - r.checkintime < 24*60*60){
                return res.json({statCode: 1});
            }
            UserInfo.update({userid:token.user.userid},{point: r.point+10, checkintime: phpDate.time()}).exec(function(err, data){
                if(err) return res.badRequest();
                UserInfo.findOne({userid:token.user.userid}).populate('city').populate('gifts').exec(function(e, r){
                    if(e) return sails.log.error('viewUserInfo:when find one userinfo,an error occured Details:',e);
                    if (!r) return res.notFound();

                    return res.json({statCode: 0, info: r});
                });
            });
        });
    }
};

