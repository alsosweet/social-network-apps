/**
 * Qing_zhaohuController
 *
 * @description :: Server-side logic for managing qing_zhaohus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    viewzhaohu: function(req, res){
        Qing_zhaohu.find().exec(function(e, r){
            //res.view()
            return res.json({zhaohu: r});
        });
    },
};

