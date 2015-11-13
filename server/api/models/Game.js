/**
* VarTouchM.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
  connection: 'jiayuanMysqlServer',
  tableName: 'qing_game',
  attributes: {
    id: {
      type: 'integer',
      size:13,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    point: {
      type: 'integer',
      size: 10,
    },
    url: {
      type: 'string',
    },
    click_count: {
      type: 'integer',
      size: 13,
    },
    context: {
      type: 'text',
    },
    addtime: {
      type: 'integer',
      size: 10,
      columnName: 'addtime'
    }
  }
};
