/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_image',
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
    name: {
      type: 'string',
      size: 100,
    },
    type: {
      type: 'string',
      size: 20,
    },
    image: {
      type: 'string',
      size: 100,
    },
    addtime: {
      type: 'integer',
      size: 10,
    },
  }
};
