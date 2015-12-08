/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_seen',
  attributes: {
    id: {
      type: 'integer',
      size:10,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      model: 'UserInfo',
      required: true
    },
      fromuserid: {
        model: 'UserInfo',
        required: true
      },
    sign: {
      type: 'integer',
      size: 5,
    },
    addtime: {
      type: 'integer',
      size: 20,
    },
  },
  updateOrCreate: function (userid, fromuserid) {
    return Seen.findOne({where:{userid: userid,fromuserid:fromuserid},
                          sort: 'id DESC'
    }).then(function (ua){
          if (ua) {
            return Seen.update({id: ua.id}, {addtime: phpDate.time(),sign: 0});
          } else {
            // Seen does not exist. Create.
            return Seen.create({
              userid: userid,
              fromuserid: fromuserid,
              sign: 0,
              addtime: phpDate.time()
            });
          }
        });

     /*   exec(function(err, ua){
      if (ua) {
        return Seen.update({id: ua.id}, {addtime: Date.now(),sign: 0});
      } else {
        // Seen does not exist. Create.
        return Seen.create({
          userid: userid,
          fromuserid: fromuserid,
          sign: 0,
          addtime: Date.now()
        });
      }
    });*/


  }
};
