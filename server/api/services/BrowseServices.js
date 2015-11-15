/**
 * BrowseServices
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/BrowseServices
 */
module.exports = {

    userscount:function(fn){
        UserInfo.count().exec(fn);
    }
};
