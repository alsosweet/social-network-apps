/**
* Qing_zhaohu.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_zhaohu',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
    },
    title: {
      type: 'string',
      columnName: 'title'
    },
    point: {
      type: 'integer',
      size: 10,
      columnName: 'point'
    }
  }
};

