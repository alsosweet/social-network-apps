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
      size: 10,
    },
  }
};
