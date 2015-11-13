/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_var_context_m',
  attributes: {
    id: {
      type: 'integer',
      size:13,
      unique: true,
      primaryKey: true,
    },
    context: {
      type: 'string',
    },
    status: {
      type: 'integer',
      size: 2,
      columnName: 'status'
    },
    sex: {
      type: 'string',
      size:5
    },
    addtime: {
      type: 'integer',
      size: 10,
      columnName: 'addtime'
    }
  }
};
