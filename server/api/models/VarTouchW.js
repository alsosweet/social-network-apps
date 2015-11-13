/**
* VarTouchW.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_var_touch_w',
  attributes: {
    id: {
      type: 'integer',
      size:13,
      unique: true,
      primaryKey: true,
    },
    touch: {
      type: 'string',
    },
    sex: {
      type: 'string',
      size:5
    },
    provice_id: {
      type: 'integer',
      size: 14,
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
