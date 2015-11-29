/**
 * SettingController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    viewWebConfig: function(req, res){
        Webconfig.find().exec(function(e, r){
            //res.view()
            return res.json({viewWebConfig: r});
        });
    },
    viewVarusernameM: function(req, res){
        VarUsernameM.find().exec(function(e, r){
            return res.json({VarusernameM: r});
        });
    },
    viewVarusernameW: function(req, res){
        VarUsernameW.find().exec(function(e, r){
            return res.json({VarusernameW: r});
        });
    },
    viewVarMessageStep1: function(req, res){
        VarMessageStep1.find().exec(function(e, r){
            return res.json({VarMessageStep1: r});
        });
    },
    viewVarIamgeM: function(req, res){
        VarIamgeM.find().exec(function(e, r){
            return res.json({VarMessageStep2: r});
        });
    },
    viewVarContextM: function(req, res){
        VarContextM.find().exec(function(e, r){
            return res.json({VarMessageStep2: r});
        });
    },

    viewUserInfo: function(req, res){
        UserInfo.find({userid:1}).exec(function(e, r){
            if(e) return sails.log.error('viewUserInfo:when find one userinfo,an error occured Details:',e);
            return res.json({UserInfo: r});
        });
    },
    viewSeen: function(req, res){
        Seen.find({userid:232}).populate('fromuserid').exec(function(e, r){
            return res.json({UserInfo: r});
        });
    },
    viewRegion: function(req, res){
        Region.find().exec(function(e, r){
            return res.json({Region: r});
        });
    },
    viewMessage: function(req, res){
        Message.find({userid:10988}).populate('fromuserid').exec(function(e, r){
            return res.json({Message: r});
        });
    },
    viewHello: function(req, res){
        Hello.find({userid:10988}).populate('fromuserid').exec(function(e, r){
            return res.json({Hello: r});
        });
    },
    viewHello2: function(req, res){
        Hello.find({userid:10988}).populate('fromuserid').populate('message').exec(function(e, r){
            return res.json({Hello2: r});
        });
    },
    viewAction: function(req, res){
        Action.find({userid:10988}).populate('userid').exec(function(e, r){
            return res.json({Action: r});
        });
    },
    viewAppsee: function(req, res){
        Appsee.find({userid:10988}).populate('userid').populate('fromuserid').exec(function(e, r){
            return res.json({Appsee: r});
        });
    },
    viewFan: function(req, res){
        Fan.find({userid:10992}).populate('userid').populate('fromuserid').exec(function(e, r){
            return res.json({Fan : r});
        });
    },
    viewChongZhi: function(req, res){
        ChongZhi.find({userid:10984}).populate('userid').exec(function(e, r){
            return res.json({ChongZhi: r});
        });
    },

};

