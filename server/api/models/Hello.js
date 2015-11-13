/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_hello',
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
    /*对应招呼的编号*/
    message: {
      model: 'Qing_zhaohu',
      required: true
    },
    /*Sign: 1表示忽略 0 表示未查看*/
    sign: {
      type: 'integer',
      size: 5,
    },
    /*Reback  1表示回复 0 表示未回复*/
    reback: {
      type: 'integer',
      size: 1,
    },
    addtime: {
      type: 'integer',
      size: 10,
    },
  }
};
