/**
 * SettingController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    viewUserInfo: function(req, res){
        UserInfo.find({userid:req.param('id')}).exec(function(e, r){
            if(e) return sails.log.error('viewUserInfo:when find one userinfo,an error occured Details:',e);
            return res.json({UserInfo: r});
        });
    },
    viewUserPage: function(req, res){
        BrowseServices.userscount(function(err, total){
            if(err) return sails.log.error('viewUserPage:',err);
            req.total = total;
            Pagination.page(req, res);
            UserInfo.find().paginate({ page: req.page.number, limit: req.page.perpage }).exec(function(e, r) {
                if(e) return sails.log.error('viewUserInfo:when find one userinfo,an error occured Details:',e);
                for(var i = 0; i < r.length; i++){
                    var id = r[i].userid%1000;
                    if(id.toString().length == 1){
                        id = '00'+id;
                    }else if(id.toString().length == 2){
                        id = '0'+id;
                    }
                    if(r[i].sex == '女'){
                        r[i].avatar = 'http://picc.eckuku.com/user_data7/'+r[i].vir_age+'/'+id+'_avatar_big.jpg';
                    }else{
                        if(r[i].vir_age >33) r[i].vir_age = 30;
                        r[i].avatar = 'http://picc.eckuku.com/user_data6/'+r[i].vir_age+'/'+id+'_avatar_big.jpg';
                    }

                    r[i].dist = i+req.page.from;
                    r[i].age = r[i].vir_age;
                }
                return res.json({UserInfo: r});
            });

        });
    },
};

