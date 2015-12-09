/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    message: function(req, res){

        var token = req.token;
        Message.find({where:{userid:token.user.userid}, limit:30, sort:'addtime DESC'}).populate('fromuserid').exec(function(err, data){
            if(err) return res.badRequest();
            //if(data.length == 0) return res.notFound();
            for(var i = 0; i <data.length; i++){
                data[i].fromuserid = virtualization.varatr([data[i].fromuserid], null)[0];
                data[i].addtime = phpDate.date("Y-m-d", data[i].addtime);
            }
            return res.json(data);
        });
    },
    sendmessage: function(req, res){

        var token = req.token;
        Message.find({where:{fromuserid:token.user.userid}, limit:30, sort:'addtime DESC'}).populate('userid').exec(function(err, data){
            if(err) return res.badRequest();
            //if(data.length == 0) return res.notFound();
            for(var i = 0; i <data.length; i++){
                data[i].userid = virtualization.varatr([data[i].userid], null)[0];
                data[i].addtime = phpDate.date("Y-m-d", data[i].addtime);
            }
            return res.json(data);
        });
    },

    respond: function(req, res){

        var token = req.token;

        Message.create({
            userid: req.body.userid,
            fromuserid: token.user.userid,
            sign: 0,
            status: 0,
            step: 0,
            message: req.body.message,
            addtime: phpDate.time()
        }).exec(function(err, data){
            if(err) return res.badRequest();

            UserInfo.publishUpdate(req.body.userid, {
                fromuser:token.user,
                data:data,
                action: 3,
            });
            if(!!req.body.messageid){
                Message.update({id: req.body.messageid}, {addtime: phpDate.time(),sign: 1}).exec(function(err, data){});
            }
            return res.json(data);
        });
    },

    del: function(req, res){
        Message.destroy({id:req.body.id}).exec(function(err){
            console.log('The record has been deleted');
            if(err) return res.badRequest();
            return res.ok();
        });
    }
};

