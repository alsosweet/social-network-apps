/**
* VarUsernameM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_var_username_m',
  attributes: {
    id: {
      type: 'integer',
      size:13,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: 'string',
    },
    sex: {
      type: 'string',
      size:5
    },
    status: {
      type: 'integer',
      size: 2,
      columnName: 'status'
    },
    addtime: {
      type: 'integer',
      size: 10,
      columnName: 'addtime'
    }
  }
};

