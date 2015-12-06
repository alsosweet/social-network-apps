/**
 * HelloController
 *
 * @description :: Server-side logic for managing helloes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    hello: function(req, res){

        var token = req.token;
        Hello.find({where:{userid:token.user.userid, reback: 0}, limit:30, sort:'addtime DESC'}).populate('fromuserid').populate('message').exec(function(err, data){
            if(err) return res.badRequest();
            //if(data.length == 0) return res.notFound();
            for(var i = 0; i <data.length; i++){
                data[i].fromuserid = virtualization.varatr([data[i].fromuserid], null)[0];
            }
            return res.json(data);
        });
    },

    respond: function(req, res){

        var token = req.token;
        var today = new Date();
        Hello.create({
            userid: req.body.userid,
            fromuserid: token.user.userid,
            sign: 0,
            reback: 0,
            message: req.body.message,
            addtime: today
        }).exec(function(err, data){
            if(err) return res.badRequest();

            UserInfo.publishUpdate(req.body.userid, {
                fromuser:token.user,
                data:data,
                action: 2,//' 某人给你打招呼'
            });
            return res.json(data);
        });
    },

    del: function(req, res){
        Hello.destroy({id:req.body.id}).exec(function(err){
            console.log('The record has been deleted');
            if(err) return res.badRequest();
            return res.ok();
        });
    }
};

