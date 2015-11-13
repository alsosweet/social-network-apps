/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_fan',
  attributes: {
    id: {
      type: 'integer',
      size:10,
      unique: true,
      primaryKey: true,
    },
    userid: {
      model: 'UserInfo',
      required: true
    },
    fromuserid: {
      model: 'UserInfo',
      required: true
    },
    /*0表示建立关注，1表示取消关注*/
    sign: {
      type: 'integer',
      size: 11,
    },
    addtime: {
      type: 'integer',
      size: 11,
    },
  }
};
