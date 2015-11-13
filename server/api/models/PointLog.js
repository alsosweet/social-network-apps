/**
* VarUsernameW.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_point_log',
  attributes: {
    id: {
      type: 'integer',
      size:13,
      unique: true,
      primaryKey: true,
    },
    userid: {
      model: 'UserInfo',
      required: true
    },
    see_userid: {
      type: 'integer',
      size:4
    },
    amount: {
      type: 'integer',
      size: 5,
    },
    context: {
      type: 'string',
      size: 100,
    },
    type: {
      type: 'string',
      size: 5,
    },
    addtime: {
      type: 'integer',
      size: 10,
    },
  }
};

