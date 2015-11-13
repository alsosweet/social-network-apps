/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_fang',
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
    /*sign: 0 不显示；1显示*/
    sign: {
      type: 'integer',
      size: 5,
    },
    /*time  提交post的时间*/
    time: {
      type: 'string',
      size: 20,
    },
    addtime: {
      type: 'integer',
      size: 10,
    },
  }
};
