/**
* VarMessageStep2.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_var_message_step2',
  attributes: {
    id: {
      type: 'integer',
      size:13,
      unique: true,
      primaryKey: true,
    },
    content: {
      type: 'string',
    },
    statu: {
      type: 'integer',
      size: 10,
    },
    addtime: {
      type: 'integer',
      size: 10,
      columnName: 'addtime'
    }
  }
};

