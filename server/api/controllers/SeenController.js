/**
 * SeenController
 *
 * @description :: Server-side logic for managing seens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    seen: function(req, res){

        var token = req.token;
        Seen.find({where:{userid:token.user.userid}, limit:20, sort:'addtime DESC'}).populate('fromuserid').exec(function(err, data){
            if(err) return res.badRequest();
            //if(data.length == 0) return res.notFound();
            for(var i = 0; i <data.length; i++){
                data[i].fromuserid = virtualization.varatr([data[i].fromuserid], null)[0];
            }
            return res.json(data);
        });
    },
    clearSeen: function(req, res){

        var token = req.token;
        Seen.update({userid:token.user.userid, sign: 0},{sign : 1}).exec(function(err, data){
            if(err) return res.badRequest();
            for(var i = 0; i <data.length; i++){
                data[i].fromuserid = virtualization.varatr([data[i].fromuserid], null)[0];
            }
            return res.json(data);
        });
    },
};

