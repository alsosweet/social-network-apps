/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_liwu',
  attributes: {
    id: {
      type: 'integer',
      size:10,
      unique: true,
      primaryKey: true,
    },
    point: {
      type: 'integer',
      size: 10,
    },
    title: {
      type: 'string',
      size: 100,
    },
  }
};
